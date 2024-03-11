import { ethers } from 'ethers';
import { DEFAULT_PROTECTED_DATA_SHARING_APP } from '../../config/config.js';
import { WorkflowError } from '../../utils/errors.js';
import {
  addressOrEnsOrAnySchema,
  positiveNumberSchema,
  throwIfMissing,
} from '../../utils/validators.js';
import type {
  AddToCollectionParams,
  SharingContractConsumer,
  SuccessWithTransactionHash,
} from '../types/index.js';
import { IExecConsumer } from '../types/internalTypes.js';
import { approveCollectionContract } from './smartContract/approveCollectionContract.js';
import { getPocoAppRegistryContract } from './smartContract/getPocoRegistryContract.js';
import { getSharingContract } from './smartContract/getSharingContract.js';
import {
  onlyCollectionOperator,
  onlyProtectedDataNotInCollection,
} from './smartContract/preflightChecks.js';

export const addToCollection = async ({
  iexec = throwIfMissing(),
  sharingContractAddress = throwIfMissing(),
  collectionTokenId,
  protectedDataAddress,
  appAddress,
  onStatusUpdate,
}: IExecConsumer &
  SharingContractConsumer &
  AddToCollectionParams): Promise<SuccessWithTransactionHash> => {
  // TODO: How to check that onStatusUpdate is a function?
  // Example in zod: https://zod.dev/?id=functions
  // const vonStatusUpdate: string = fnSchema().label('onStatusUpdate').validateSync(onStatusUpdate);
  const vCollectionTokenId = positiveNumberSchema()
    .required()
    .label('collectionTokenId')
    .validateSync(collectionTokenId);
  const vProtectedDataAddress = addressOrEnsOrAnySchema()
    .required()
    .label('protectedDataAddress')
    .validateSync(protectedDataAddress);
  const vAppAddress = addressOrEnsOrAnySchema()
    .label('appAddress')
    .validateSync(appAddress);

  let userAddress = await iexec.wallet.getAddress();
  userAddress = userAddress.toLowerCase();

  const sharingContract = await getSharingContract(
    iexec,
    sharingContractAddress
  );

  //---------- Smart Contract Call ----------
  await onlyCollectionOperator({
    sharingContract,
    collectionTokenId: vCollectionTokenId,
    userAddress,
  });
  await onlyProtectedDataNotInCollection({
    sharingContract,
    protectedDataAddress: vProtectedDataAddress,
  });

  onStatusUpdate?.({
    title: 'APPROVE_COLLECTION_CONTRACT',
    isDone: false,
  });
  // Approve collection SC to change the owner of my protected data in the registry SC
  const approveTx = await approveCollectionContract({
    iexec,
    protectedDataAddress: vProtectedDataAddress,
    sharingContractAddress,
  });
  onStatusUpdate?.({
    title: 'APPROVE_COLLECTION_CONTRACT',
    isDone: true,
    payload: {
      approveTxHash: approveTx.hash,
    },
  });

  try {
    onStatusUpdate?.({
      title: 'ADD_PROTECTED_DATA_TO_COLLECTION',
      isDone: false,
    });

    if (vAppAddress) {
      const pocoAppRegistryContract = await getPocoAppRegistryContract(iexec);
      const appTokenId = ethers.getBigInt(vAppAddress).toString();
      let appOwner = await pocoAppRegistryContract.ownerOf(appTokenId);
      appOwner = appOwner.toLowerCase();
      if (appOwner !== sharingContractAddress) {
        throw new Error(
          'The provided app is not owned by the DataProtector Sharing contract'
        );
      }
    }
    const { txOptions } = await iexec.config.resolveContractsClient();
    const tx = await sharingContract.addProtectedDataToCollection(
      vCollectionTokenId,
      vProtectedDataAddress,
      vAppAddress || DEFAULT_PROTECTED_DATA_SHARING_APP,
      txOptions
    );
    await tx.wait();

    onStatusUpdate?.({
      title: 'ADD_PROTECTED_DATA_TO_COLLECTION',
      isDone: true,
    });

    return {
      txHash: tx.hash,
    };
  } catch (e) {
    throw new WorkflowError('Failed to add protected data to collection', e);
  }
};
