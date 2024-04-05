import { Address, AddressOrENS } from './commonTypes.js';

/***************************************************************************
 *                        Subgraph Types                                    *
 ***************************************************************************/

// ---------------------DataProtector Types------------------------------------
export type ProtectedDatasGraphQLResponse = {
  protectedDatas: Array<{
    id: Address;
    name: string;
    owner: { id: AddressOrENS };
    schema: Array<Record<'id', string>>;
    collection: { id: bigint };
    isIncludedInSubscription: boolean;
    isRentable: boolean;
    isForSale: boolean;
    creationTimestamp: string;
  }>;
};

export type ProtectedDataPricingParamsGraphQLResponse = {
  protectedData?: {
    id: Address;
    name: string;
    isRentable: boolean;
    isIncludedInSubscription: boolean;
    isForSale: boolean;
    collection?: {
      subscriptionParams?: {
        price: number;
        duration: number;
      };
    };
    rentalParam?: {
      price: number;
      duration: number;
    };
  };
};

// ---------------------Collection Types------------------------------------
export type GetCollectionsByOwnerGraphQLResponse = {
  collections: OneCollectionByOwnerGraphQLResponse[];
};

type OneCollectionByOwnerGraphQLResponse = {
  id: number;
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
};

export type GetCollectionSubscribersGraphQLResponse = {
  collectionSubscriptions: CollectionSubscription[];
};

type CollectionSubscription = {
  subscriber: {
    id: string;
  };
  endDate: string;
};

export type GetCollectionOwnersGraphQLResponse = {
  accounts: Array<{ id: Address }>;
};

// ---------------------Rental Types------------------------------------

export type GetRentalsGraphQLResponse = {
  rentals: Array<{
    id: string;
    renter: Address;
    protectedData: { id: AddressOrENS; name: string };
    creationTimestamp: number;
    endDate: number;
    rentalParams: {
      price: number;
      duration: number;
    };
  }>;
};

// ---------------------AppWhitelist Types------------------------------------

export type GetUserAppWhitelistGraphQLResponse = {
  appWhitelists: Array<{
    id: string;
    owner: string;
    app: Array<{
      id: string;
    }>;
  }>;
};
