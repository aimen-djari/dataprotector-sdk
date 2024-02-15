import { WorkflowError } from '../../utils/errors.js';
import { throwIfMissing } from '../../utils/validators.js';
import {
  IExecConsumer,
  RemoveFromCollectionParams,
  SuccessWithTransactionHash,
  SubgraphConsumer,
} from '../types/index.js';
import { getSharingContract } from './smartContract/getSharingContract.js';
import {
  collectionExists,
  isCollectionOwner,
  isProtectedDataInCollection,
} from './utils.js';

export const removeFromCollection = async ({
  iexec = throwIfMissing(),
  graphQLClient = throwIfMissing(),
  protectedDataAddress = throwIfMissing(),
}: IExecConsumer &
  SubgraphConsumer &
  RemoveFromCollectionParams): Promise<SuccessWithTransactionHash> => {
  //TODO:Input validation

  //TODO: Get collectionTokenId
  const collectionExist = await collectionExists({
    graphQLClient,
    collectionTokenId: collectionTokenId,
  });
  if (!collectionExist) {
    throw new WorkflowError(
      'Failed to Remove Protected Data From Renting: collection does not exist.'
    );
  }

  const userAddress = await iexec.wallet.getAddress();

  const userIsCollectionOwner = await isCollectionOwner({
    graphQLClient,
    collectionTokenId: collectionTokenId,
    walletAddress: userAddress,
  });
  if (!userIsCollectionOwner) {
    throw new WorkflowError(
      'Failed to Remove Protected Data From Renting: user is not collection owner.'
    );
  }
  const ProtectedDataInCollection = await isProtectedDataInCollection({
    graphQLClient,
    protectedDataAddress,
    collectionTokenId: collectionTokenId,
  });
  if (!ProtectedDataInCollection) {
    throw new WorkflowError(
      'Failed to Remove Protected Data From Renting: Protected Data is not in collection.'
    );
  }
  //TODO : Add verifiers

  const sharingContract = await getSharingContract();
  try {
    const tx = await sharingContract.removeProtectedDataFromCollection(
      collectionTokenId,
      protectedDataAddress
    );
    const txReceipt = await tx.wait();
    return {
      success: true,
      txHash: txReceipt.hash,
    };
  } catch (e) {
    throw new WorkflowError('Failed to Remove Protected Data From Renting', e);
  }
};
