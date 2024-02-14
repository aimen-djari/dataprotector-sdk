import { gql, type GraphQLClient } from 'graphql-request';
import { GetProtectedDataByIdGraphQLResponse } from '../../types/graphQLTypes.js';
import type { Address } from '../../types/index.js';

export async function getProtectedDataById({
  graphQLClient,
  protectedDataAddress,
}: {
  graphQLClient: GraphQLClient;
  protectedDataAddress: Address;
}) {
  const getProtectedDataQuery = gql`
    query  {
      protectedData(
        id: "${protectedDataAddress}"
      ) {
        id
        owner {
          id
        }
        collection {
          id
          owner {
            id
          }
        }
        isRentable
        isIncludedInSubscription
        #isForSale
      }
    }
  `;
  const { protectedData }: GetProtectedDataByIdGraphQLResponse = await graphQLClient.request<{
    protectedData: {
      id: Address;
      name: string;
      owner: { id: Address };
      collection: { id: Address; owner: { id: Address } };
      isRentable: boolean;
      isIncludedInSubscription: boolean;
      // isForSale: boolean;
    };
  }>(getProtectedDataQuery);
  return protectedData;
}
