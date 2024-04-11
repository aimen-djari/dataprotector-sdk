import type { CollectionWithProtectedDatas } from '@iexec/dataprotector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle } from 'react-feather';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { getDataProtectorClient } from '@/externals/dataProtectorClient.ts';
import { pluralize } from '@/utils/pluralize.ts';
import { secondsToDays } from '@/utils/secondsToDays.ts';
import { truncateAddress } from '@/utils/truncateAddress.ts';

export function SubscribeButton({
  collection,
}: {
  collection: CollectionWithProtectedDatas;
}) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async () => {
      if (!collection || !collection.subscriptionParams) {
        console.log('No collection or no subscriptionParams?');
        return;
      }
      const { dataProtectorSharing } = await getDataProtectorClient();
      return dataProtectorSharing.subscribeToCollection({
        collectionTokenId: collection.id,
        duration: collection.subscriptionParams.duration,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['collections', collection.owner.id],
      });
      toast({
        variant: 'success',
        title: 'Subscription added',
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!collection.subscriptionParams}>Subscribe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Subscription to {truncateAddress(collection.owner.id)}
          </DialogTitle>
        </DialogHeader>
        <div className="mx-6 mt-6 rounded-xl border border-primary p-5">
          <div className="text-2xl font-bold">
            {collection.subscriptionParams?.price} RLC
          </div>
          <div>
            for{' '}
            {pluralize(
              secondsToDays(collection.subscriptionParams?.duration),
              'day'
            )}
          </div>
          <div className="text-sm font-extralight italic">
            This subscription is not automatically renewed
          </div>
          <div className="mt-4 flex flex-col gap-y-1">
            <div className="flex items-center gap-x-1.5">
              <CheckCircle size="20" className="text-primary" />
              {pluralize(collection.protectedDatas.length, 'content')}
            </div>
            <div className="flex items-center gap-x-1.5">
              <CheckCircle size="20" className="text-primary" />
              Unlimited viewing
            </div>
            <div className="flex items-center gap-x-1.5">
              <CheckCircle size="20" className="text-primary" />
              Access new content during period
            </div>
          </div>
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={subscribeMutation.isPending}
            isLoading={subscribeMutation.isPending}
            onClick={() => {
              subscribeMutation.mutate();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
