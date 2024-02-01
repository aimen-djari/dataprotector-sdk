import { WorkflowError } from '../../utils/errors.js';
import type { CreateCollectionResponse } from '../types.js';
import { getCollectionContract } from './smartContract/getCollectionContract.js';

export const createCollection = async (): Promise<CreateCollectionResponse> => {
  const collectionContract = await getCollectionContract();
  const transactionReceipt = await collectionContract
    .createCollection()
    .then((tx) => tx.wait())
    .catch((e: Error) => {
      throw new WorkflowError(
        'Failed to create collection into sharing smart contract',
        e
      );
    });

  const mintedTokenId = transactionReceipt.logs.find(
    ({ eventName }) => eventName === 'Transfer'
  )?.args[2] as bigint;

  return {
    collectionId: Number(mintedTokenId),
  };
};
