/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common.js";

export interface ICollectionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addProtectedDataToCollection"
      | "createCollection"
      | "removeCollection"
      | "removeProtectedDataFromCollection"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "ProtectedDataTransfer"): EventFragment;

  encodeFunctionData(
    functionFragment: "addProtectedDataToCollection",
    values: [BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeCollection",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeProtectedDataFromCollection",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addProtectedDataToCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeProtectedDataFromCollection",
    data: BytesLike
  ): Result;
}

export namespace ProtectedDataTransferEvent {
  export type InputTuple = [
    protectedData: AddressLike,
    newCollection: BigNumberish,
    oldCollection: BigNumberish,
    appAddress: AddressLike
  ];
  export type OutputTuple = [
    protectedData: string,
    newCollection: bigint,
    oldCollection: bigint,
    appAddress: string
  ];
  export interface OutputObject {
    protectedData: string;
    newCollection: bigint;
    oldCollection: bigint;
    appAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ICollection extends BaseContract {
  connect(runner?: ContractRunner | null): ICollection;
  waitForDeployment(): Promise<this>;

  interface: ICollectionInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addProtectedDataToCollection: TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _appAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  createCollection: TypedContractMethod<
    [_to: AddressLike],
    [bigint],
    "nonpayable"
  >;

  removeCollection: TypedContractMethod<
    [_collectionTokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  removeProtectedDataFromCollection: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addProtectedDataToCollection"
  ): TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _appAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createCollection"
  ): TypedContractMethod<[_to: AddressLike], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "removeCollection"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeProtectedDataFromCollection"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ProtectedDataTransfer"
  ): TypedContractEvent<
    ProtectedDataTransferEvent.InputTuple,
    ProtectedDataTransferEvent.OutputTuple,
    ProtectedDataTransferEvent.OutputObject
  >;

  filters: {
    "ProtectedDataTransfer(address,uint256,uint256,address)": TypedContractEvent<
      ProtectedDataTransferEvent.InputTuple,
      ProtectedDataTransferEvent.OutputTuple,
      ProtectedDataTransferEvent.OutputObject
    >;
    ProtectedDataTransfer: TypedContractEvent<
      ProtectedDataTransferEvent.InputTuple,
      ProtectedDataTransferEvent.OutputTuple,
      ProtectedDataTransferEvent.OutputObject
    >;
  };
}
