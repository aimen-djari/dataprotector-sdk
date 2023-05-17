import { ValidationError, WorkflowError } from '../utils/errors.js';
import { addressSchema, throwIfMissing } from '../utils/validators.js';
import { gql } from 'graphql-request';
import {
  FetchProtectedDataParams,
  DataSchema,
  ProtectedData,
  SubgraphConsumer,
  GraphQLResponse,
} from './types.js';
import {
  ensureDataSchemaIsValid,
  transformGraphQLResponse,
} from '../utils/data.js';

function flattenSchema(schema: DataSchema, parentKey = ''): string[] {
  return Object.entries(schema).flatMap(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object') {
      return flattenSchema(value, newKey);
    } else {
      return `${newKey}:${value}`;
    }
  });
}

export const fetchProtectedData = async ({
  graphQLClient = throwIfMissing(),
  requiredSchema = {},
  owner,
}: FetchProtectedDataParams & SubgraphConsumer): Promise<ProtectedData[]> => {
  let vRequiredSchema: DataSchema;
  try {
    ensureDataSchemaIsValid(requiredSchema);
    vRequiredSchema = requiredSchema;
  } catch (e: any) {
    throw new ValidationError(`schema is not valid: ${e.message}`);
  }
  let vOwner: string = addressSchema().label('owner').validateSync(owner);
  console.log(vOwner ? `owner: "${vOwner}",` : '');
  try {
    const schemaArray = flattenSchema(vRequiredSchema);
    const SchemaFilteredProtectedData = gql`
    query SchemaFilteredProtectedData(
      $requiredSchema: [String!]!
      $start: Int!
      $range: Int!
      $owner: String
    ) {
      protectedDatas(
        where: {
          transactionHash_not: "0x", 
          schema_contains: $requiredSchema, 
          ${vOwner ? `owner: "${vOwner}",` : ''}
        }
        skip: $start
        first: $range
        orderBy: creationTimestamp
        orderDirection: desc
      ) {
        id
        name
        owner {
          id
        }
        jsonSchema
        creationTimestamp
      }
    }
  `;
    //in case of a large number of protected data, we need to paginate the query
    const variables = {
      requiredSchema: schemaArray,
      start: 0,
      range: 1000,
    };
    let protectedDataResultQuery: GraphQLResponse = await graphQLClient.request(
      SchemaFilteredProtectedData,
      variables
    );
    let protectedDataArray: ProtectedData[] = transformGraphQLResponse(
      protectedDataResultQuery
    );
    return protectedDataArray;
  } catch (error) {
    throw new WorkflowError(
      `Failed to fetch protected data : ${error.message}`,
      error
    );
  }
};
