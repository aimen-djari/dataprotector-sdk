import { beforeAll, describe, expect, it } from '@jest/globals';
import { Wallet, type HDNodeWallet } from 'ethers';
import { IExecDataProtector } from '../../../src/index.js';
import { getTestConfig, timeouts } from '../../test-utils.js';

describe('dataProtector.setProtectedDataToSubscription()', () => {
  let dataProtector: IExecDataProtector;
  let wallet: HDNodeWallet;

  beforeAll(async () => {
    wallet = Wallet.createRandom();
    dataProtector = new IExecDataProtector(...getTestConfig(wallet.privateKey));
  });

  describe('When calling setProtectedDataToSubscription()', () => {
    it(
      'should answer with success true',
      async () => {
        const result = await dataProtector.core.protectData({
          name: 'test',
          data: { doNotUse: 'test' },
        });

        const { collectionTokenId } =
          await dataProtector.sharing.createCollection();

        await dataProtector.sharing.addToCollection({
          collectionTokenId,
          protectedDataAddress: result.address,
        });

        const setProtectedDataToSubscriptionResult =
          await dataProtector.sharing.setProtectedDataToSubscription({
            protectedDataAddress: result.address,
          });
        expect(setProtectedDataToSubscriptionResult).toEqual({
          txHash: expect.any(String),
        });
      },
      timeouts.protectData +
        timeouts.createCollection +
        timeouts.addToCollection +
        timeouts.setProtectedDataToSubscription
    );
  });
  describe('When the given protected data address is not a valid address', () => {
    it(
      'should throw with the corresponding error',
      async () => {
        // --- GIVEN
        const invalidProtectedDataAddress = '0x123...';

        // --- WHEN / THEN
        await expect(
          dataProtector.sharing.setProtectedDataToSubscription({
            protectedDataAddress: invalidProtectedDataAddress,
          })
        ).rejects.toThrow(
          new Error(
            'protectedDataAddress should be an ethereum address or a ENS name'
          )
        );
      },
      timeouts.setProtectedDataToSubscription
    );
  });
});
