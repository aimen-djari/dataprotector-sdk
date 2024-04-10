import { useQuery } from '@tanstack/react-query';
import { Alert } from '@/components/Alert.tsx';
import { CircularLoader } from '@/components/CircularLoader.tsx';
import { getDataProtectorClient } from '@/externals/dataProtectorClient.ts';
import { OneCreatorCard } from './OneCreatorCard.tsx';
import { CollectionOwner } from '@iexec/dataprotector';

export function AllCreators() {
  const {
    isLoading,
    isSuccess,
    data: firstTenAccounts,
    isError,
    error,
  } = useQuery({
    queryKey: ['allCreators'],
    queryFn: async () => {
      const { dataProtectorSharing } = await getDataProtectorClient();
      const { collectionOwners } =
        await dataProtectorSharing.getCollectionOwners({
          limit: 8,
        });
      return collectionOwners;
    },
  });

  const hasSubscribed = (account: CollectionOwner) => {
    return account.collections.some(
      (collection) =>
        collection.subscriptions && collection.subscriptions.length > 0
    );
  };
  console.log(firstTenAccounts);
  return (
    <>
      <h3 className="text-2xl font-bold">Hots creators 🔥</h3>

      {isLoading && (
        <div className="mt-4 flex flex-col items-center gap-y-4">
          <CircularLoader />
        </div>
      )}

      {isError && (
        <Alert variant="error" className="mt-4">
          <p>Oops, something went wrong while fetching all creators.</p>
          <p className="mt-1 text-sm text-orange-300">{error.toString()}</p>
        </Alert>
      )}

      {isSuccess && firstTenAccounts.length === 0 && (
        <div className="mt-4 flex flex-col items-center gap-y-4">
          No creator? 🤔
        </div>
      )}

      {isSuccess && firstTenAccounts.length > 0 && (
        <div
          className="mt-8 grid w-full gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          }}
        >
          {firstTenAccounts?.map((account) => (
            <div key={account.id}>
              <OneCreatorCard
                className="h-full"
                creator={account}
                showSubscribedChip={hasSubscribed(account)}
              />
              {/* { account.collections[0].subscriptions[0].subscriber.id } */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
