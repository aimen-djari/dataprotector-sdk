import { SCONE_TAG, WORKERPOOL_ADDRESS } from '../../config/config.js';
import { WorkflowError } from '../../utils/errors.js';
import { resolveENS } from '../../utils/resolveENS.js';
import { getOrGenerateKeyPair } from '../../utils/rsa.js';
import { getEventFromLogs } from '../../utils/transactionEvent.js';
import {
  addressOrEnsSchema,
  throwIfMissing,
  validateOnStatusUpdateCallback,
} from '../../utils/validators.js';
import {
  ConsumeProtectedDataParams,
  ConsumeProtectedDataResponse,
  ConsumeProtectedDataStatuses,
  OnStatusUpdateFn,
  SharingContractConsumer,
} from '../types/index.js';
import { IExecConsumer } from '../types/internalTypes.js';
import { getResultFromCompletedTask } from './getResultFromCompletedTask.js';
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
  onStatusUpdate = () => {},
}: IExecConsumer &
  SharingContractConsumer &
  ConsumeProtectedDataParams): Promise<ConsumeProtectedDataResponse> => {
  let vProtectedData = addressOrEnsSchema()
    .required()
    .label('protectedData')
    .validateSync(protectedData);
  const vOnStatusUpdate =
    validateOnStatusUpdateCallback<
      OnStatusUpdateFn<ConsumeProtectedDataStatuses>
    >(onStatusUpdate);

  // ENS resolution if needed
  vProtectedData = await resolveENS(iexec, vProtectedData);

  let userAddress = await iexec.wallet.getAddress();
  userAddress = userAddress.toLowerCase();

  const sharingContract = await getSharingContract(
    iexec,
    sharingContractAddress
  );

  //---------- Smart Contract Call ----------
  try {

    // Make a deal
    vOnStatusUpdate({
      title: 'CONSUME_ORDER_REQUESTED',
      isDone: false,
    });
    
    const { txOptions } = await iexec.config.resolveContractsClient();
    let tx;
    let transactionReceipt;
    try {
      tx = await sharingContract.consumeProtectedData(
        vProtectedData,
        txOptions
      );
      transactionReceipt = await tx.wait();
    } catch (err) {
      console.error('Smart-contract consumeProtectedData() ERROR', err);
      throw err;
    }
    vOnStatusUpdate({
      title: 'CONSUME_ORDER_REQUESTED',
      isDone: true,
      payload: {
        txHash: tx.hash,
      },
    });

    vOnStatusUpdate({
      title: 'CONSUME_TASK_COMPLETED',
      isDone: false,
    });

    const specificEventForPreviousTx = getEventFromLogs(
      'ProtectedDataConsumed',
      transactionReceipt.logs,
      { strict: true }
    );

    const { contentAsObjectURL } = await getResultFromCompletedTask({
      iexec,
      protectedData,
      onStatusUpdate: vOnStatusUpdate,
    });

    vOnStatusUpdate({
      title: 'CONSUME_TASK_COMPLETED',
      isDone: true,
    });

    return {
      txHash: tx.hash,
      contentAsObjectURL,
    };
  } catch (e) {
    // Try to extract some meaningful error like:
    // "insufficient funds for transfer"
    if (e?.info?.error?.data?.message) {
      throw new WorkflowError(
        `Failed to consume protected data: ${e.info.error.data.message}`,
        e
      );
    }
    // Try to extract some meaningful error like:
    // "User denied transaction signature"
    if (e?.info?.error?.message) {
      throw new WorkflowError(
        `Failed to consume protected data: ${e.info.error.message}`,
        e
      );
    }
    throw new WorkflowError(
      'Sharing smart contract: Failed to consume protected data',
      e
    );
  }
};
