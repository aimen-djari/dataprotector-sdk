import { WorkflowError } from '../../utils/errors.js';
import { getEventFromLogs } from '../../utils/transactionEvent.js';
import { throwIfMissing } from '../../utils/validators.js';
import type {
  CreateCollectionResponse,
  SharingContractConsumer,
} from '../types/index.js';
import { IExecConsumer } from '../types/internalTypes.js';
import { getSharingContract } from './smartContract/getSharingContract.js';

export const createCollection = async ({
  iexec = throwIfMissing(),
  sharingContractAddress = throwIfMissing(),
}: IExecConsumer &
  SharingContractConsumer): Promise<CreateCollectionResponse> => {
  const sharingContract = await getSharingContract(
    iexec,
    sharingContractAddress
  );
  try {
    let userAddress = await iexec.wallet.getAddress();
    userAddress = userAddress.toLowerCase();
    const { txOptions } = await iexec.config.resolveContractsClient();
    const tx = await sharingContract.createCollection(userAddress, txOptions);
    const transactionReceipt = await tx.wait();

    const specificEventForPreviousTx = getEventFromLogs(
      'Transfer',
      transactionReceipt.logs,
      { strict: true }
    );

    const mintedTokenId = specificEventForPreviousTx.args?.tokenId;
    return {
      collectionTokenId: Number(mintedTokenId),
      txHash: tx.hash,
    };
  } catch (e) {
    throw new WorkflowError(
      'Failed to create collection into collection smart contract',
      e
    );
  }
};
