import { Eip1193Provider } from 'ethers';
import { GraphQLClient } from 'graphql-request';
import { IExec } from 'iexec';
import {
  DEFAULT_CONTRACT_ADDRESS,
  DEFAULT_IEXEC_IPFS_NODE,
  DEFAULT_IPFS_GATEWAY,
  DEFAULT_SHARING_CONTRACT_ADDRESS,
  DEFAULT_SUBGRAPH_URL,
} from '../config/config.js';
import { Observable } from '../utils/reactive.js';
import { fetchGrantedAccess } from './fetchGrantedAccess.js';
import { fetchProtectedData } from './fetchProtectedData.js';
import { grantAccess } from './grantAccess.js';
import { processProtectedData } from './processProtectedData.js';
import { protectData } from './protectData.js';
import { protectDataObservable } from './protectDataObservable.js';
import { revokeAllAccessObservable } from './revokeAllAccessObservable.js';
import { revokeOneAccess } from './revokeOneAccess.js';
import { addToCollection } from './sharing/addToCollection.js';
import { createCollection } from './sharing/createCollection.js';
import { setProtectedDataToSubscription } from './sharing/setProtectedDataToSubscription.js';
import { setSubscriptionOptions } from './sharing/setSubscriptionOptions.js';
import { saveForSharingContract } from './sharing/smartContract/getSharingContract.js';
import { getCollectionsByOwner } from './sharing/subgraph/getCollectionsByOwner.js';
import { getCreators } from './sharing/subgraph/getCreators.js';
import { saveForPocoRegistryContract } from './smartContract/getPocoRegistryContract.js';
import { transferOwnership } from './transferOwnership.js';
import {
  AddToCollectionParams,
  AddressOrENS,
  CreateCollectionResponse,
  DataProtectorConfigOptions,
  FetchGrantedAccessParams,
  FetchProtectedDataParams,
  GetCollectionsByOwnerParams,
  GrantAccessParams,
  GrantedAccess,
  GrantedAccessResponse,
  ProcessProtectedDataParams,
  ProtectDataMessage,
  ProtectDataParams,
  ProtectedData,
  ProtectedDataWithSecretProps,
  RevokeAllAccessMessage,
  RevokeAllAccessParams,
  RevokedAccess,
  SetProtectedDataToSubscriptionParams,
  SetProtectedDataToSubscriptionResponse,
  SetSubscriptionOptionsParams,
  SetSubscriptionOptionsResponse,
  Taskid,
  TransferParams,
  TransferResponse,
  Web3SignerProvider,
  GetCollectionsByOwnerResponse,
} from './types.js';

class IExecDataProtector {
  private contractAddress: AddressOrENS;

  private sharingContractAddress: AddressOrENS;

  private graphQLClient: GraphQLClient;

  private ipfsNode: string;

  private ipfsGateway: string;

  private iexec: IExec;

  constructor(
    ethProvider: Eip1193Provider | Web3SignerProvider,
    options?: DataProtectorConfigOptions
  ) {
    try {
      this.iexec = new IExec({ ethProvider }, options?.iexecOptions);
    } catch (e) {
      throw new Error(`Unsupported ethProvider, ${e.message}`);
    }
    try {
      this.graphQLClient = new GraphQLClient(
        options?.subgraphUrl || DEFAULT_SUBGRAPH_URL
      );
    } catch (error) {
      throw new Error(`Failed to create GraphQLClient: ${error.message}`);
    }
    this.contractAddress = options?.contractAddress || DEFAULT_CONTRACT_ADDRESS;
    this.sharingContractAddress =
      options?.sharingContractAddress || DEFAULT_SHARING_CONTRACT_ADDRESS;
    this.ipfsNode = options?.ipfsNode || DEFAULT_IEXEC_IPFS_NODE;
    this.ipfsGateway = options?.ipfsGateway || DEFAULT_IPFS_GATEWAY;

    saveForSharingContract(this.iexec, this.sharingContractAddress);
    saveForPocoRegistryContract(this.iexec);
  }

  getGraphQLClient(): GraphQLClient {
    return this.graphQLClient;
  }

  protectData(args: ProtectDataParams): Promise<ProtectedDataWithSecretProps> {
    return protectData({
      ...args,
      contractAddress: this.contractAddress,
      ipfsNode: this.ipfsNode,
      ipfsGateway: this.ipfsGateway,
      iexec: this.iexec,
    });
  }

  protectDataObservable(
    args: ProtectDataParams
  ): Observable<ProtectDataMessage> {
    return protectDataObservable({
      ...args,
      contractAddress: this.contractAddress,
      ipfsNode: this.ipfsNode,
      ipfsGateway: this.ipfsGateway,
      iexec: this.iexec,
    });
  }

  grantAccess(args: GrantAccessParams): Promise<GrantedAccess> {
    return grantAccess({ ...args, iexec: this.iexec });
  }

  fetchGrantedAccess(
    args: FetchGrantedAccessParams
  ): Promise<GrantedAccessResponse> {
    return fetchGrantedAccess({ ...args, iexec: this.iexec });
  }

  revokeAllAccessObservable(
    args: RevokeAllAccessParams
  ): Observable<RevokeAllAccessMessage> {
    return revokeAllAccessObservable({ ...args, iexec: this.iexec });
  }

  revokeOneAccess(args: GrantedAccess): Promise<RevokedAccess> {
    return revokeOneAccess({ ...args, iexec: this.iexec });
  }

  fetchProtectedData(
    args?: FetchProtectedDataParams
  ): Promise<ProtectedData[]> {
    return fetchProtectedData({
      ...args,
      graphQLClient: this.graphQLClient,
    });
  }

  transferOwnership(args: TransferParams): Promise<TransferResponse> {
    return transferOwnership({ ...args, iexec: this.iexec });
  }

  processProtectedData = (args: ProcessProtectedDataParams): Promise<Taskid> =>
    processProtectedData({
      ...args,
      iexec: this.iexec,
    });

  /***************************************************************************
   *                        Sharing Methods                                  *
   ***************************************************************************/

  createCollection = (): Promise<CreateCollectionResponse> =>
    createCollection();

  addToCollection = (args: AddToCollectionParams) =>
    addToCollection({
      ...args,
      graphQLClient: this.graphQLClient,
      dataProtectorContractAddress: this.contractAddress,
      sharingContractAddress: this.sharingContractAddress,
      iexec: this.iexec,
    });

  setSubscriptionOptions = (
    args: SetSubscriptionOptionsParams
  ): Promise<SetSubscriptionOptionsResponse> =>
    setSubscriptionOptions({
      ...args,
      iexec: this.iexec,
      sharingContractAddress: this.sharingContractAddress,
    });

  setProtectedDataToSubscription = (
    args: SetProtectedDataToSubscriptionParams
  ): Promise<SetProtectedDataToSubscriptionResponse> =>
    setProtectedDataToSubscription({
      ...args,
      iexec: this.iexec,
      sharingContractAddress: this.sharingContractAddress,
    });

  getCollectionsByOwner = (
    args: GetCollectionsByOwnerParams
  ): Promise<GetCollectionsByOwnerResponse> =>
    getCollectionsByOwner({
      ...args,
      graphQLClient: this.graphQLClient,
    });

  getCreators = () =>
    getCreators({
      graphQLClient: this.graphQLClient,
    });
}

export { IExecDataProtector };
