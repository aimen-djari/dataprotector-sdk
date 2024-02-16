import { WorkflowError } from '../../utils/errors.js';
import type { CreateCollectionResponse } from '../types/index.js';
import { getSharingContract } from './smartContract/getSharingContract.js';

export const createCollection = async (): Promise<CreateCollectionResponse> => {
  const sharingContract = await getSharingContract();
  try {
    const tx = await sharingContract.createCollection();
    const txReceipt = await tx.wait();

    const mintedTokenId = txReceipt.logs.find(
      ({ eventName }) => eventName === 'Transfer'
    )?.args[2] as bigint;

    return {
      collectionTokenId: Number(mintedTokenId),
      txHash: txReceipt.hash,
    };
  } catch (e) {
    throw new WorkflowError(
      'Failed to create collection into collection smart contract',
      e
    );
  }
};
