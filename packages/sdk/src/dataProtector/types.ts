/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transaction } from 'ethers';
import { GraphQLClient } from 'graphql-request';
import { EnhancedWallet, IExec, TeeFramework, Taskid as _Taskid } from 'iexec';
import { IExecConfigOptions } from 'iexec/IExecConfig';

export type Address = string;
type ENS = string;

export type Taskid = _Taskid;

export type Web3SignerProvider = EnhancedWallet;

/**
 * ethereum address or ENS name (Ethereum Name Service)
 */
export type AddressOrENS = Address | ENS;

export type IExecConsumer = {
  iexec: IExec;
};
export type AddressOrENSConsumer = {
  contractAddress?: AddressOrENS;
};
export type SubgraphConsumer = {
  graphQLClient: GraphQLClient;
};

export type DataScalarType =
  | boolean
  | number
  | string
  | Uint8Array
  | ArrayBuffer;
export interface DataObject
  extends Record<string, DataObject | DataScalarType> {}

export type MimeType =
  | 'application/octet-stream'
  | 'application/pdf'
  | 'application/xml'
  | 'application/zip'
  | 'audio/midi'
  | 'audio/mpeg'
  | 'audio/x-wav'
  | 'image/bmp'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'video/mp4'
  | 'video/mpeg'
  | 'video/x-msvideo';

export type ScalarType = 'boolean' | 'number' | 'string';

export type DataSchemaEntryType = ScalarType | MimeType;
export interface DataSchema
  extends Record<string, DataSchema | DataSchemaEntryType> {}

export type IpfsNodeAndGateway = {
  /**
   * use it to upload the encrypted data on a specific IPFS node
   */
  ipfsNode?: string;

  /**
   * use a specific IPFS gateway
   */
  ipfsGateway?: string;
};

export type ProtectDataParams = {
  /**
   * data to protect
   */
  data: DataObject;

  /**
   * name of the data (this is public)
   *
   * if no `name` is specified, the protected data name will be an empty string
   */
  name?: string;
};

export type ProcessProtectedDataParams = {
  /**
   * Address or ENS (Ethereum Name Service) of the protected data.
   */
  protectedData: AddressOrENS;

  /**
   * Address or ENS of the authorized application to process the protected data.
   */
  app: AddressOrENS;

  /**
   * The maximum price per task for processing the protected data.
   * It is the sum of the application price, dataset price and workerpool price per task.
  @default = 0
  */
  maxPrice?: number;

  /**
   * Arguments to pass to the application during execution.
   */
  args?: string;

  /**
   * The input file required for the application's execution (direct download URL).
   */
  inputFiles?: string[];

  /**
   * Requester secrets necessary for the application's execution.
   * It is represented as a mapping of numerical identifiers to corresponding secrets.
   */
  secrets?: Record<number, string>;
};

type ProtectDataDataExtractedMessage = {
  message: 'DATA_SCHEMA_EXTRACTED';
  schema: DataSchema;
};

type ProtectDataZipCreatedMessage = {
  message: 'ZIP_FILE_CREATED';
  zipFile: Uint8Array;
};

type ProtectDataEncryptionKeyCreatedMessage = {
  message: 'ENCRYPTION_KEY_CREATED';
  encryptionKey: string;
};

type ProtectDataFileEncryptedMessage = {
  message: 'FILE_ENCRYPTED';
  encryptedFile: Uint8Array;
};

type ProtectDataEncryptedFileUploadedMessage = {
  message: 'ENCRYPTED_FILE_UPLOADED';
  cid: string;
};

type ProtectDataProtectedDataDeploymentRequestMessage = {
  message: 'PROTECTED_DATA_DEPLOYMENT_REQUEST';
  owner: Address;
  name: string;
  schema: DataSchema;
};

type ProtectDataProtectedDataDeploymentSuccessMessage = {
  message: 'PROTECTED_DATA_DEPLOYMENT_SUCCESS';
  address: Address;
  owner: Address;
  creationTimestamp: number;
  txHash: string;
};

type ProtectDataPushSecretRequestMessage = {
  message: 'PUSH_SECRET_TO_SMS_REQUEST';
  teeFramework: TeeFramework;
};

type ProtectDataPushSecretSuccessMessage = {
  message: 'PUSH_SECRET_TO_SMS_SUCCESS';
  teeFramework: TeeFramework;
};

export type ProtectDataMessage =
  | ProtectDataDataExtractedMessage
  | ProtectDataZipCreatedMessage
  | ProtectDataEncryptionKeyCreatedMessage
  | ProtectDataFileEncryptedMessage
  | ProtectDataEncryptedFileUploadedMessage
  | ProtectDataProtectedDataDeploymentRequestMessage
  | ProtectDataProtectedDataDeploymentSuccessMessage
  | ProtectDataPushSecretRequestMessage
  | ProtectDataPushSecretSuccessMessage;

type RevokeAllAccessRetrievedAccessMessage = {
  message: 'GRANTED_ACCESS_RETRIEVED';
  access: GrantedAccess[];
};
type RevokeAllAccessRevokeRequestMessage = {
  message: 'REVOKE_ONE_ACCESS_REQUEST';
  access: GrantedAccess;
};
type RevokeAllAccessRevokeSuccessMessage = {
  message: 'REVOKE_ONE_ACCESS_SUCCESS';
  txHash: string;
  access: GrantedAccess;
};
export type RevokeAllAccessMessage =
  | RevokeAllAccessRevokeRequestMessage
  | RevokeAllAccessRevokeSuccessMessage
  | RevokeAllAccessRetrievedAccessMessage;

export type GrantAccessParams = {
  /**
   * Protected Data address or ENS
   */
  protectedData: AddressOrENS;
  /**
   * Address or ENS of the app authorized to use the `protectedData`
   */
  authorizedApp: AddressOrENS;
  /**
   * Address or ENS of the user authorized to use the `protectedData`
   *
   * The address zero `0x0000000000000000000000000000000000000000` can be use to authorize any user to use the `protectedData`.
   */
  authorizedUser: AddressOrENS;
  /**
   * Price paid by the `authorizedUser` per access to the `protectedData` labeled in nRLC.
   */
  pricePerAccess?: number;
  /**
   * Total number of access to the `protectedData` for the generated authorization.
   */
  numberOfAccess?: number;
};

export type FetchGrantedAccessParams = {
  /**
   * Protected Data address or ENS
   *
   * Default fetch for any protectedData
   */
  protectedData?: AddressOrENS | 'any';
  /**
   * Address or ENS of the app authorized to use the `protectedData`
   *
   * Default fetch for any app
   */
  authorizedApp?: AddressOrENS | 'any';
  /**
   * Address or ENS of the user authorized to use the `protectedData`
   *
   * Default fetch for any user
   */
  authorizedUser?: AddressOrENS | 'any';
  /**
   * Index of the page to fetch
   */
  page?: number;
  /**
   * Size of the page to fetch
   */
  pageSize?: number;
};

export type RevokeAllAccessParams = {
  /**
   * Protected Data address or ENS
   */
  protectedData: AddressOrENS;
  /**
   * Address or ENS of the app authorized to use the `protectedData`
   *
   * Default revoke for any app
   */
  authorizedApp?: AddressOrENS | 'any';
  /**
   * Address or ENS of the user authorized to use the `protectedData`
   *
   * Default revoke for any user
   */
  authorizedUser?: AddressOrENS | 'any';
};

export type GrantedAccess = {
  dataset: string;
  datasetprice: string; // string notation allowed for big integers
  volume: string; // string notation allowed for big integers
  tag: string;
  apprestrict: string;
  workerpoolrestrict: string;
  requesterrestrict: string;
  salt: string;
  sign: string;
};

export type GrantedAccessResponse = {
  count: number;
  grantedAccess: GrantedAccess[];
};

export type RevokedAccess = {
  access: GrantedAccess;
  txHash: string;
};

/**
 * Public props of a protected data
 */
export type ProtectedData = {
  name: string;
  address: Address;
  owner: Address;
  schema: DataSchema;
  creationTimestamp: number;
};

/**
 * Secret props of a protected data
 */
type ProtectedDataCreationProps = {
  transactionHash: string;
  zipFile: Uint8Array;
  encryptionKey: string;
};

export type ProtectedDataWithSecretProps = ProtectedData &
  ProtectedDataCreationProps;

export type FetchProtectedDataParams = {
  requiredSchema?: DataSchema;
  owner?: AddressOrENS;
  page?: number;
  pageSize?: number;
};

export type SetSubscriptionOptionsParams = {
  collectionTokenId: number;
  priceInNRLC: bigint;
  durationInSeconds: number;
};

export type SetProtectedDataAsRentableParams = {
  collectionTokenId: number;
  protectedDataAddress: Address;
  priceInNRLC: bigint;
  durationInSeconds: number;
};

export type RemoveProtectedDataAsRentableParams = {
  collectionTokenId: number;
  protectedDataAddress: Address;
};

/**
 * Internal props for querying the subgraph
 */

type Owner = {
  id: string;
};

type ProtectedDataQuery = {
  id: string;
  name: string;
  owner: Owner;
  schema: Array<Record<'id', string>>;
  creationTimestamp: string;
};
type CollectionSubscription = {
  subscriber: {
    id: string;
  };
  endDate: string;
};
export type GraphQLResponseSubscribers = {
  collectionSubscriptions: CollectionSubscription[];
};
export type GraphQLResponse = {
  protectedDatas: ProtectedDataQuery[];
};

export type TransferParams = {
  protectedData: Address;
  newOwner: AddressOrENS;
};

export type TransferResponse = {
  address: Address;
  to: AddressOrENS;
  txHash: string;
};

export type SetSubscriptionOptionsResponse = {
  success: boolean;
};

export type SetProtectedDataAsRentableResponse = {
  success: boolean;
};

export type RemoveProtectedDataAsRentableResponse = {
  success: boolean;
};

/**
 * Configuration options for DataProtector.
 */
export type DataProtectorConfigOptions = {
  /**
   * The Ethereum contract address or ENS (Ethereum Name Service) for dataProtector smart contract.
   * If not provided, the default dataProtector contract address will be used.
   * @default{@link DEFAULT_CONTRACT_ADDRESS}
   */
  contractAddress?: AddressOrENS;

  /**
   * The Ethereum contract address or ENS (Ethereum Name Service) for dataProtector sharing smart contract.
   * If not provided, the default dataProtector sharing contract address will be used.
   * @default{@link DEFAULT_SHARING_CONTRACT_ADDRESS}
   */
  sharingContractAddress?: AddressOrENS;

  /**
   * The Ethereum contract address or ENS (Ethereum Name Service) for dataProtector collection smart contract.
   * If not provided, the default dataProtector collection contract address will be used.
   * @default{@link DEFAULT_COLLECTION_CONTRACT_ADDRESS}
   */
  collectionContractAddress?: AddressOrENS;

  /**
   * The subgraph URL for querying data.
   * If not provided, the default dataProtector subgraph URL will be used.
   * @default{@link DEFAULT_SUBGRAPH_URL}
   */
  subgraphUrl?: string;

  /**
   * Options specific to iExec integration.
   * If not provided, default iexec options will be used.
   */
  iexecOptions?: IExecConfigOptions;

  /**
   * The IPFS node URL.
   * If not provided, the default dataProtector IPFS node URL will be used.
   * @default{@link DEFAULT_IEXEC_IPFS_NODE}
   */
  ipfsNode?: string;

  /**
   * The IPFS gateway URL.
   * If not provided, the default dataProtector IPFS gateway URL will be used.
   * @default{@link DEFAULT_IPFS_GATEWAY}
   */
  ipfsGateway?: string;
};

/***************************************************************************
 *                        Sharing Types                                    *
 ***************************************************************************/
export type OnStatusUpdateFn = (params: {
  title: string;
  isDone: boolean;
  payload?: Record<string, string>;
}) => void;

export type Creator = {
  address: AddressOrENS;
};

// ---------------------Collection Types------------------------------------
export type CreateCollectionResponse = {
  collectionId: number;
  transaction: Transaction;
};

export type AddToCollectionParams = {
  collectionId: number;
  protectedDataAddress: AddressOrENS;
  appAddress?: AddressOrENS;
  onStatusUpdate?: OnStatusUpdateFn;
};

export type AddToCollectionResponse = {
  transaction: Transaction;
  success: boolean;
};

export type GetCollectionsByOwnerParams = {
  ownerAddress: AddressOrENS;
};

export type GetCollectionsByOwnerResponse = Array<{
  id: bigint;
  creationTimestamp: number;
  protectedDatas: Array<{
    id: Address;
    name: string;
    creationTimestamp: number;
    isRentable: boolean;
    isIncludedInSubscription: boolean;
  }>;
  subscriptionParams: {
    price: number;
    duration: number;
  };
  subscriptions: Array<{
    subscriber: {
      id: Address;
    };
    endDate: number;
  }>;
}>;

// ---------------------Subscription Types------------------------------------
export type SetProtectedDataToSubscriptionParams = {
  collectionTokenId: number;
  protectedDataAddress: AddressOrENS;
};

export type SetProtectedDataToSubscriptionResponse = {
  transaction: Transaction;
  success: boolean;
};

export type SetSubscriptionParamsResponse = {
  transaction: Transaction;
  success: boolean;
};

export type SetSubscriptionParams = {
  collectionTokenId: number;
  priceInNRLC: bigint;
  durationInSeconds: number;
};

export type Subscriber = {
  address: Address;
  endSubscriptionTimestamp: number;
};

export type GetSubscribersResponse = {
  subscribers: Subscriber[];
};

export type SubscribeResponse = {
  transaction: Transaction;
  success: boolean;
};

export type SubscribeParams = {
  collectionId: number;
};

// ---------------------Rental Types------------------------------------
export type GetRentersParams = {
  protectedDataAddress: AddressOrENS;
  includePastRentals?: boolean;
};

// Define GraphQLRentersResponse type
export type GraphQLRentersResponse = {
  protectedData: {
    rentals: Array<{
      id: string;
      renter: Address;
      endDate: number;
      creationTimestamp: number;
      rentalParams: {
        duration: number;
        price: number;
      };
    }>;
  };
};

export type Renters = {
  id: string;
  renter: Address;
  endDateTimestamp: number;
  creationTimestamp: number;
  rentalParams: {
    durationInSeconds: number;
    priceInNRLC: number;
  };
};
