import { beforeAll, describe, expect, it } from '@jest/globals';
import { Wallet, type HDNodeWallet } from 'ethers';
import { IExecDataProtector, getWeb3Provider } from '../../../src/index.js';
import {
  MAX_EXPECTED_BLOCKTIME,
  MAX_EXPECTED_WEB2_SERVICES_TIME,
  sleep,
} from '../../test-utils.js';

describe('dataProtector.getSubscribers()', () => {
  let dataProtector: IExecDataProtector;
  let wallet: HDNodeWallet;

  beforeAll(async () => {
    wallet = Wallet.createRandom();
    dataProtector = new IExecDataProtector(getWeb3Provider(wallet.privateKey));
  });

  describe('When calling getSubscribers()', () => {
    it(
      'should work',
      async () => {
        const { collectionTokenId } = await dataProtector.createCollection();
        //Test price and duration values
        const priceInNRLC = BigInt('0');
        const durationInSeconds = 2000;
        await dataProtector.setSubscriptionParams({
          collectionTokenId,
          priceInNRLC,
          durationInSeconds,
        });

        //simulate three subscribers
        const wallet1 = Wallet.createRandom();
        const dataProtector1 = new IExecDataProtector(
          getWeb3Provider(wallet1.privateKey)
        );
        const wallet2 = Wallet.createRandom();
        const dataProtector2 = new IExecDataProtector(
          getWeb3Provider(wallet2.privateKey)
        );
        const wallet3 = Wallet.createRandom();
        const dataProtector3 = new IExecDataProtector(
          getWeb3Provider(wallet3.privateKey)
        );

        await dataProtector1.subscribe({
          collectionTokenId,
        });
        await dataProtector2.subscribe({
          collectionTokenId,
        });
        await dataProtector3.subscribe({
          collectionTokenId,
        });
        // Wait for subgraph to index corresponding events
        // TODO: Maybe get subscribers directly from the smart contract?
        await sleep(2_000);
        const result = await dataProtector.getSubscribers({
          collectionTokenId,
        });
        expect(result.subscribers.length).toBe(3);
      },
      10 * MAX_EXPECTED_BLOCKTIME + MAX_EXPECTED_WEB2_SERVICES_TIME
    );
  });
});
