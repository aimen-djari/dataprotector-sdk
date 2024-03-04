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

export declare namespace ISubscription {
  export type SubscriptionParamsStruct = {
    price: BigNumberish;
    duration: BigNumberish;
  };

  export type SubscriptionParamsStructOutput = [
    price: bigint,
    duration: bigint
  ] & { price: bigint; duration: bigint };
}

export declare namespace IexecLibOrders_v5 {
  export type WorkerpoolOrderStruct = {
    workerpool: AddressLike;
    workerpoolprice: BigNumberish;
    volume: BigNumberish;
    tag: BytesLike;
    category: BigNumberish;
    trust: BigNumberish;
    apprestrict: AddressLike;
    datasetrestrict: AddressLike;
    requesterrestrict: AddressLike;
    salt: BytesLike;
    sign: BytesLike;
  };

  export type WorkerpoolOrderStructOutput = [
    workerpool: string,
    workerpoolprice: bigint,
    volume: bigint,
    tag: string,
    category: bigint,
    trust: bigint,
    apprestrict: string,
    datasetrestrict: string,
    requesterrestrict: string,
    salt: string,
    sign: string
  ] & {
    workerpool: string;
    workerpoolprice: bigint;
    volume: bigint;
    tag: string;
    category: bigint;
    trust: bigint;
    apprestrict: string;
    datasetrestrict: string;
    requesterrestrict: string;
    salt: string;
    sign: string;
  };
}

export interface IProtectedDataSharingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addProtectedDataToCollection"
      | "buyProtectedData"
      | "buyProtectedDataForCollection"
      | "consumeProtectedData"
      | "createCollection"
      | "removeCollection"
      | "removeProtectedDataForSale"
      | "removeProtectedDataFromCollection"
      | "removeProtectedDataFromRenting"
      | "removeProtectedDataFromSubscription"
      | "rentProtectedData"
      | "setProtectedDataForSale"
      | "setProtectedDataToRenting"
      | "setProtectedDataToSubscription"
      | "setSubscriptionParams"
      | "subscribeTo"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "NewRental"
      | "NewSubscription"
      | "NewSubscriptionParams"
      | "ProtectedDataAddedForRenting"
      | "ProtectedDataAddedForSale"
      | "ProtectedDataAddedForSubscription"
      | "ProtectedDataConsumed"
      | "ProtectedDataRemovedFromRenting"
      | "ProtectedDataRemovedFromSale"
      | "ProtectedDataRemovedFromSubscription"
      | "ProtectedDataSold"
      | "ProtectedDataTransfer"
      | "Withdraw"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addProtectedDataToCollection",
    values: [BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "buyProtectedData",
    values: [BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "buyProtectedDataForCollection",
    values: [BigNumberish, AddressLike, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "consumeProtectedData",
    values: [
      BigNumberish,
      AddressLike,
      IexecLibOrders_v5.WorkerpoolOrderStruct,
      string
    ]
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
    functionFragment: "removeProtectedDataForSale",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeProtectedDataFromCollection",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeProtectedDataFromRenting",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeProtectedDataFromSubscription",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rentProtectedData",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtectedDataForSale",
    values: [BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtectedDataToRenting",
    values: [BigNumberish, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtectedDataToSubscription",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setSubscriptionParams",
    values: [BigNumberish, ISubscription.SubscriptionParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "subscribeTo",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addProtectedDataToCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyProtectedData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyProtectedDataForCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "consumeProtectedData",
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
    functionFragment: "removeProtectedDataForSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeProtectedDataFromCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeProtectedDataFromRenting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeProtectedDataFromSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rentProtectedData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtectedDataForSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtectedDataToRenting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtectedDataToSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSubscriptionParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subscribeTo",
    data: BytesLike
  ): Result;
}

export namespace NewRentalEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike,
    renter: AddressLike,
    endDate: BigNumberish
  ];
  export type OutputTuple = [
    collectionTokenId: bigint,
    protectedData: string,
    renter: string,
    endDate: bigint
  ];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
    renter: string;
    endDate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewSubscriptionEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    subscriber: AddressLike,
    endDate: BigNumberish
  ];
  export type OutputTuple = [
    collectionTokenId: bigint,
    subscriber: string,
    endDate: bigint
  ];
  export interface OutputObject {
    collectionTokenId: bigint;
    subscriber: string;
    endDate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewSubscriptionParamsEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    subscriptionParams: ISubscription.SubscriptionParamsStruct
  ];
  export type OutputTuple = [
    collectionTokenId: bigint,
    subscriptionParams: ISubscription.SubscriptionParamsStructOutput
  ];
  export interface OutputObject {
    collectionTokenId: bigint;
    subscriptionParams: ISubscription.SubscriptionParamsStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataAddedForRentingEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike,
    price: BigNumberish,
    duration: BigNumberish
  ];
  export type OutputTuple = [
    collectionTokenId: bigint,
    protectedData: string,
    price: bigint,
    duration: bigint
  ];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
    price: bigint;
    duration: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataAddedForSaleEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike,
    price: BigNumberish
  ];
  export type OutputTuple = [
    collectionTokenId: bigint,
    protectedData: string,
    price: bigint
  ];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
    price: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataAddedForSubscriptionEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike
  ];
  export type OutputTuple = [collectionTokenId: bigint, protectedData: string];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataConsumedEvent {
  export type InputTuple = [
    dealId: BytesLike,
    protectedData: AddressLike,
    mode: BigNumberish
  ];
  export type OutputTuple = [
    dealId: string,
    protectedData: string,
    mode: bigint
  ];
  export interface OutputObject {
    dealId: string;
    protectedData: string;
    mode: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataRemovedFromRentingEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike
  ];
  export type OutputTuple = [collectionTokenId: bigint, protectedData: string];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataRemovedFromSaleEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike
  ];
  export type OutputTuple = [collectionTokenId: bigint, protectedData: string];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataRemovedFromSubscriptionEvent {
  export type InputTuple = [
    collectionTokenId: BigNumberish,
    protectedData: AddressLike
  ];
  export type OutputTuple = [collectionTokenId: bigint, protectedData: string];
  export interface OutputObject {
    collectionTokenId: bigint;
    protectedData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtectedDataSoldEvent {
  export type InputTuple = [
    collectionTokenIdFrom: BigNumberish,
    to: AddressLike,
    protectedData: AddressLike
  ];
  export type OutputTuple = [
    collectionTokenIdFrom: bigint,
    to: string,
    protectedData: string
  ];
  export interface OutputObject {
    collectionTokenIdFrom: bigint;
    to: string;
    protectedData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
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

export namespace WithdrawEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IProtectedDataSharing extends BaseContract {
  connect(runner?: ContractRunner | null): IProtectedDataSharing;
  waitForDeployment(): Promise<this>;

  interface: IProtectedDataSharingInterface;

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

  buyProtectedData: TypedContractMethod<
    [
      _collectionTokenIdFrom: BigNumberish,
      _protectedData: AddressLike,
      _to: AddressLike
    ],
    [void],
    "payable"
  >;

  buyProtectedDataForCollection: TypedContractMethod<
    [
      _collectionTokenIdFrom: BigNumberish,
      _protectedData: AddressLike,
      _collectionTokenIdTo: BigNumberish,
      _appAddress: AddressLike
    ],
    [void],
    "payable"
  >;

  consumeProtectedData: TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _workerpoolOrder: IexecLibOrders_v5.WorkerpoolOrderStruct,
      _contentPath: string
    ],
    [string],
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

  removeProtectedDataForSale: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  removeProtectedDataFromCollection: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  removeProtectedDataFromRenting: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  removeProtectedDataFromSubscription: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  rentProtectedData: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "payable"
  >;

  setProtectedDataForSale: TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _price: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  setProtectedDataToRenting: TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _price: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  setProtectedDataToSubscription: TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;

  setSubscriptionParams: TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _subscriptionParams: ISubscription.SubscriptionParamsStruct
    ],
    [void],
    "nonpayable"
  >;

  subscribeTo: TypedContractMethod<
    [_collectionTokenId: BigNumberish],
    [bigint],
    "payable"
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
    nameOrSignature: "buyProtectedData"
  ): TypedContractMethod<
    [
      _collectionTokenIdFrom: BigNumberish,
      _protectedData: AddressLike,
      _to: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "buyProtectedDataForCollection"
  ): TypedContractMethod<
    [
      _collectionTokenIdFrom: BigNumberish,
      _protectedData: AddressLike,
      _collectionTokenIdTo: BigNumberish,
      _appAddress: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "consumeProtectedData"
  ): TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _workerpoolOrder: IexecLibOrders_v5.WorkerpoolOrderStruct,
      _contentPath: string
    ],
    [string],
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
    nameOrSignature: "removeProtectedDataForSale"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
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
  getFunction(
    nameOrSignature: "removeProtectedDataFromRenting"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeProtectedDataFromSubscription"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "rentProtectedData"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setProtectedDataForSale"
  ): TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _price: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProtectedDataToRenting"
  ): TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _protectedData: AddressLike,
      _price: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProtectedDataToSubscription"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish, _protectedData: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setSubscriptionParams"
  ): TypedContractMethod<
    [
      _collectionTokenId: BigNumberish,
      _subscriptionParams: ISubscription.SubscriptionParamsStruct
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "subscribeTo"
  ): TypedContractMethod<
    [_collectionTokenId: BigNumberish],
    [bigint],
    "payable"
  >;

  getEvent(
    key: "NewRental"
  ): TypedContractEvent<
    NewRentalEvent.InputTuple,
    NewRentalEvent.OutputTuple,
    NewRentalEvent.OutputObject
  >;
  getEvent(
    key: "NewSubscription"
  ): TypedContractEvent<
    NewSubscriptionEvent.InputTuple,
    NewSubscriptionEvent.OutputTuple,
    NewSubscriptionEvent.OutputObject
  >;
  getEvent(
    key: "NewSubscriptionParams"
  ): TypedContractEvent<
    NewSubscriptionParamsEvent.InputTuple,
    NewSubscriptionParamsEvent.OutputTuple,
    NewSubscriptionParamsEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataAddedForRenting"
  ): TypedContractEvent<
    ProtectedDataAddedForRentingEvent.InputTuple,
    ProtectedDataAddedForRentingEvent.OutputTuple,
    ProtectedDataAddedForRentingEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataAddedForSale"
  ): TypedContractEvent<
    ProtectedDataAddedForSaleEvent.InputTuple,
    ProtectedDataAddedForSaleEvent.OutputTuple,
    ProtectedDataAddedForSaleEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataAddedForSubscription"
  ): TypedContractEvent<
    ProtectedDataAddedForSubscriptionEvent.InputTuple,
    ProtectedDataAddedForSubscriptionEvent.OutputTuple,
    ProtectedDataAddedForSubscriptionEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataConsumed"
  ): TypedContractEvent<
    ProtectedDataConsumedEvent.InputTuple,
    ProtectedDataConsumedEvent.OutputTuple,
    ProtectedDataConsumedEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataRemovedFromRenting"
  ): TypedContractEvent<
    ProtectedDataRemovedFromRentingEvent.InputTuple,
    ProtectedDataRemovedFromRentingEvent.OutputTuple,
    ProtectedDataRemovedFromRentingEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataRemovedFromSale"
  ): TypedContractEvent<
    ProtectedDataRemovedFromSaleEvent.InputTuple,
    ProtectedDataRemovedFromSaleEvent.OutputTuple,
    ProtectedDataRemovedFromSaleEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataRemovedFromSubscription"
  ): TypedContractEvent<
    ProtectedDataRemovedFromSubscriptionEvent.InputTuple,
    ProtectedDataRemovedFromSubscriptionEvent.OutputTuple,
    ProtectedDataRemovedFromSubscriptionEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataSold"
  ): TypedContractEvent<
    ProtectedDataSoldEvent.InputTuple,
    ProtectedDataSoldEvent.OutputTuple,
    ProtectedDataSoldEvent.OutputObject
  >;
  getEvent(
    key: "ProtectedDataTransfer"
  ): TypedContractEvent<
    ProtectedDataTransferEvent.InputTuple,
    ProtectedDataTransferEvent.OutputTuple,
    ProtectedDataTransferEvent.OutputObject
  >;
  getEvent(
    key: "Withdraw"
  ): TypedContractEvent<
    WithdrawEvent.InputTuple,
    WithdrawEvent.OutputTuple,
    WithdrawEvent.OutputObject
  >;

  filters: {
    "NewRental(uint256,address,address,uint48)": TypedContractEvent<
      NewRentalEvent.InputTuple,
      NewRentalEvent.OutputTuple,
      NewRentalEvent.OutputObject
    >;
    NewRental: TypedContractEvent<
      NewRentalEvent.InputTuple,
      NewRentalEvent.OutputTuple,
      NewRentalEvent.OutputObject
    >;

    "NewSubscription(uint256,address,uint48)": TypedContractEvent<
      NewSubscriptionEvent.InputTuple,
      NewSubscriptionEvent.OutputTuple,
      NewSubscriptionEvent.OutputObject
    >;
    NewSubscription: TypedContractEvent<
      NewSubscriptionEvent.InputTuple,
      NewSubscriptionEvent.OutputTuple,
      NewSubscriptionEvent.OutputObject
    >;

    "NewSubscriptionParams(uint256,tuple)": TypedContractEvent<
      NewSubscriptionParamsEvent.InputTuple,
      NewSubscriptionParamsEvent.OutputTuple,
      NewSubscriptionParamsEvent.OutputObject
    >;
    NewSubscriptionParams: TypedContractEvent<
      NewSubscriptionParamsEvent.InputTuple,
      NewSubscriptionParamsEvent.OutputTuple,
      NewSubscriptionParamsEvent.OutputObject
    >;

    "ProtectedDataAddedForRenting(uint256,address,uint112,uint48)": TypedContractEvent<
      ProtectedDataAddedForRentingEvent.InputTuple,
      ProtectedDataAddedForRentingEvent.OutputTuple,
      ProtectedDataAddedForRentingEvent.OutputObject
    >;
    ProtectedDataAddedForRenting: TypedContractEvent<
      ProtectedDataAddedForRentingEvent.InputTuple,
      ProtectedDataAddedForRentingEvent.OutputTuple,
      ProtectedDataAddedForRentingEvent.OutputObject
    >;

    "ProtectedDataAddedForSale(uint256,address,uint112)": TypedContractEvent<
      ProtectedDataAddedForSaleEvent.InputTuple,
      ProtectedDataAddedForSaleEvent.OutputTuple,
      ProtectedDataAddedForSaleEvent.OutputObject
    >;
    ProtectedDataAddedForSale: TypedContractEvent<
      ProtectedDataAddedForSaleEvent.InputTuple,
      ProtectedDataAddedForSaleEvent.OutputTuple,
      ProtectedDataAddedForSaleEvent.OutputObject
    >;

    "ProtectedDataAddedForSubscription(uint256,address)": TypedContractEvent<
      ProtectedDataAddedForSubscriptionEvent.InputTuple,
      ProtectedDataAddedForSubscriptionEvent.OutputTuple,
      ProtectedDataAddedForSubscriptionEvent.OutputObject
    >;
    ProtectedDataAddedForSubscription: TypedContractEvent<
      ProtectedDataAddedForSubscriptionEvent.InputTuple,
      ProtectedDataAddedForSubscriptionEvent.OutputTuple,
      ProtectedDataAddedForSubscriptionEvent.OutputObject
    >;

    "ProtectedDataConsumed(bytes32,address,uint8)": TypedContractEvent<
      ProtectedDataConsumedEvent.InputTuple,
      ProtectedDataConsumedEvent.OutputTuple,
      ProtectedDataConsumedEvent.OutputObject
    >;
    ProtectedDataConsumed: TypedContractEvent<
      ProtectedDataConsumedEvent.InputTuple,
      ProtectedDataConsumedEvent.OutputTuple,
      ProtectedDataConsumedEvent.OutputObject
    >;

    "ProtectedDataRemovedFromRenting(uint256,address)": TypedContractEvent<
      ProtectedDataRemovedFromRentingEvent.InputTuple,
      ProtectedDataRemovedFromRentingEvent.OutputTuple,
      ProtectedDataRemovedFromRentingEvent.OutputObject
    >;
    ProtectedDataRemovedFromRenting: TypedContractEvent<
      ProtectedDataRemovedFromRentingEvent.InputTuple,
      ProtectedDataRemovedFromRentingEvent.OutputTuple,
      ProtectedDataRemovedFromRentingEvent.OutputObject
    >;

    "ProtectedDataRemovedFromSale(uint256,address)": TypedContractEvent<
      ProtectedDataRemovedFromSaleEvent.InputTuple,
      ProtectedDataRemovedFromSaleEvent.OutputTuple,
      ProtectedDataRemovedFromSaleEvent.OutputObject
    >;
    ProtectedDataRemovedFromSale: TypedContractEvent<
      ProtectedDataRemovedFromSaleEvent.InputTuple,
      ProtectedDataRemovedFromSaleEvent.OutputTuple,
      ProtectedDataRemovedFromSaleEvent.OutputObject
    >;

    "ProtectedDataRemovedFromSubscription(uint256,address)": TypedContractEvent<
      ProtectedDataRemovedFromSubscriptionEvent.InputTuple,
      ProtectedDataRemovedFromSubscriptionEvent.OutputTuple,
      ProtectedDataRemovedFromSubscriptionEvent.OutputObject
    >;
    ProtectedDataRemovedFromSubscription: TypedContractEvent<
      ProtectedDataRemovedFromSubscriptionEvent.InputTuple,
      ProtectedDataRemovedFromSubscriptionEvent.OutputTuple,
      ProtectedDataRemovedFromSubscriptionEvent.OutputObject
    >;

    "ProtectedDataSold(uint256,address,address)": TypedContractEvent<
      ProtectedDataSoldEvent.InputTuple,
      ProtectedDataSoldEvent.OutputTuple,
      ProtectedDataSoldEvent.OutputObject
    >;
    ProtectedDataSold: TypedContractEvent<
      ProtectedDataSoldEvent.InputTuple,
      ProtectedDataSoldEvent.OutputTuple,
      ProtectedDataSoldEvent.OutputObject
    >;

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

    "Withdraw(address,uint256)": TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;
    Withdraw: TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;
  };
}
