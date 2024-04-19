import { decryptResult } from 'iexec/utils';
import { SCONE_TAG, WORKERPOOL_ADDRESS } from '../../config/config.js';
import { WorkflowError } from '../../utils/errors.js';
import { resolveENS } from '../../utils/resolveENS.js';
import { generateKeyPair, privateAsPem } from '../../utils/rsa.js';
import { getEventFromLogs } from '../../utils/transactionEvent.js';
import {
  addressOrEnsSchema,
  throwIfMissing,
  validateOnStatusUpdateCallback,
} from '../../utils/validators.js';
import { OnStatusUpdateFn } from '../types/commonTypes.js';
import { IExecConsumer } from '../types/internalTypes.js';
import {
  SharingContractConsumer,
  ConsumeProtectedDataParams,
  ConsumeProtectedDataResponse,
  ConsumeProtectedDataStatuses,
} from '../types/sharingTypes.js';
import { getAppWhitelistContract } from './smartContract/getAddOnlyAppWhitelistContract.js';
import { getSharingContract } from './smartContract/getSharingContract.js';
import {
  onlyAppInAddOnlyAppWhitelist,
  onlyProtectedDataAuthorizedToBeConsumed,
} from './smartContract/preflightChecks.js';
import { getProtectedDataDetails } from './smartContract/sharingContract.reads.js';

export const consumeProtectedData = async ({
  iexec = throwIfMissing(),
  sharingContractAddress = throwIfMissing(),
  protectedData,
  app,
  workerpool,
  onStatusUpdate = () => {},
}: IExecConsumer &
  SharingContractConsumer &
  ConsumeProtectedDataParams): Promise<ConsumeProtectedDataResponse> => {
  let vProtectedData = addressOrEnsSchema()
    .required()
    .label('protectedData')
    .validateSync(protectedData);
  let vApp = addressOrEnsSchema().required().label('app').validateSync(app);
  let vWorkerpool = addressOrEnsSchema()
    .label('workerpool')
    .validateSync(workerpool);
  const vOnStatusUpdate =
    validateOnStatusUpdateCallback<
      OnStatusUpdateFn<ConsumeProtectedDataStatuses>
    >(onStatusUpdate);

  // ENS resolution if needed
  vProtectedData = await resolveENS(iexec, vProtectedData);
  vApp = await resolveENS(iexec, vApp);
  vWorkerpool = await resolveENS(iexec, vWorkerpool);

  let userAddress = await iexec.wallet.getAddress();
  userAddress = userAddress.toLowerCase();

  const sharingContract = await getSharingContract(
    iexec,
    sharingContractAddress
  );

  //---------- Smart Contract Call ----------
  const protectedDataDetails = await getProtectedDataDetails({
    sharingContract,
    protectedData: vProtectedData,
    userAddress,
  });

  const addOnlyAppWhitelistContract = await getAppWhitelistContract(
    iexec,
    protectedDataDetails.addOnlyAppWhitelist
  );
  //---------- Pre flight check----------
  onlyProtectedDataAuthorizedToBeConsumed(protectedDataDetails);
  onlyAppInAddOnlyAppWhitelist({ addOnlyAppWhitelistContract, app: vApp });

  try {
    const workerpoolOrderbook = await iexec.orderbook.fetchWorkerpoolOrderbook({
      workerpool: vWorkerpool || WORKERPOOL_ADDRESS,
      app,
      dataset: vProtectedData,
      minTag: SCONE_TAG,
      maxTag: SCONE_TAG,
    });
    const workerpoolOrder = workerpoolOrderbook.orders[0]?.order;
    if (workerpoolOrder.workerpoolprice > 0) {
      throw new WorkflowError(
        'Could not find a free workerpool order, maybe too many requests? You might want to try again later.'
      );
    }

    const { publicKey, privateKey } = await generateKeyPair();
    await iexec.result.pushResultEncryptionKey(publicKey, {
      forceUpdate: true,
    });

    // Make a deal
    vOnStatusUpdate({
      title: 'CONSUME_ORDER_REQUESTED',
      isDone: false,
    });
    const { txOptions } = await iexec.config.resolveContractsClient();
    const tx = await sharingContract.consumeProtectedData(
      vProtectedData,
      workerpoolOrder,
      vApp,
      txOptions
    );
    const transactionReceipt = await tx.wait();
    vOnStatusUpdate({
      title: 'CONSUME_ORDER_REQUESTED',
      isDone: true,
      payload: {
        txHash: tx.hash,
      },
    });

    const specificEventForPreviousTx = getEventFromLogs(
      'ProtectedDataConsumed',
      transactionReceipt.logs,
      { strict: true }
    );

    const dealId = specificEventForPreviousTx.args?.dealId;
    const taskId = await iexec.deal.computeTaskId(dealId, 0);

    const taskObservable = await iexec.task.obsTask(taskId, { dealid: dealId });
    vOnStatusUpdate({
      title: 'CONSUME_TASK_ACTIVE',
      isDone: true,
      payload: {
        taskId: taskId,
      },
    });

    await new Promise((resolve, reject) => {
      taskObservable.subscribe({
        next: () => {},
        error: (e) => {
          vOnStatusUpdate({
            title: 'CONSUME_TASK_ERROR',
            isDone: true,
            payload: {
              taskId: taskId,
            },
          });
          reject(e);
        },
        complete: () => resolve(undefined),
      });
    });

    vOnStatusUpdate({
      title: 'CONSUME_TASK_COMPLETED',
      isDone: true,
      payload: {
        taskId: taskId,
      },
    });

    vOnStatusUpdate({
      title: 'CONSUME_RESULT_DOWNLOAD',
      isDone: false,
    });

    const taskResult = await iexec.task.fetchResults(taskId);
    vOnStatusUpdate({
      title: 'CONSUME_RESULT_DOWNLOAD',
      isDone: true,
    });

    const rawTaskResult = await taskResult.arrayBuffer();
    const pemPrivateKey = await privateAsPem(privateKey);

    vOnStatusUpdate({
      title: 'CONSUME_RESULT_DECRYPT',
      isDone: false,
    });

    const decryptedResult = await decryptResult(rawTaskResult, pemPrivateKey);
    vOnStatusUpdate({
      title: 'CONSUME_RESULT_DECRYPT',
      isDone: true,
    });

    const decryptedBlob = new Blob([decryptedResult], {
      type: 'application/zip',
    });

    const resultZipFile = URL.createObjectURL(decryptedBlob);
    vOnStatusUpdate({
      title: 'CONSUME_RESULT_COMPLETE',
      isDone: true,
    });

    return {
      txHash: tx.hash,
      dealId,
      resultZipFile,
    };
  } catch (e) {
    console.log(e);
    throw new WorkflowError(
      'Sharing smart contract: Failed to consume a ProtectedData',
      e
    );
  }
};
