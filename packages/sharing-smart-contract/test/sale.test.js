import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers.js';
import { expect } from 'chai';
import pkg from 'hardhat';
import {
  POCO_APP_REGISTRY_ADDRESS,
  POCO_PROTECTED_DATA_REGISTRY_ADDRESS,
  POCO_PROXY_ADDRESS,
} from '../config/config.js';
import { createAppFor } from '../scripts/singleFunction/app.js';
import { createDatasetFor } from '../scripts/singleFunction/dataset.js';

const { ethers } = pkg;
const rpcURL = pkg.network.config.url;

describe('Sale', () => {
  const priceOption = ethers.parseEther('0.5');

  async function deploySCFixture() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const ProtectedDataSharingFactory = await ethers.getContractFactory('ProtectedDataSharing');
    const protectedDataSharingContract = await ProtectedDataSharingFactory.deploy(
      POCO_PROXY_ADDRESS,
      POCO_APP_REGISTRY_ADDRESS,
      POCO_PROTECTED_DATA_REGISTRY_ADDRESS,
      owner.address,
    );
    const deploymentTransaction = protectedDataSharingContract.deploymentTransaction();
    await deploymentTransaction?.wait();

    const appAddress = await createAppFor(await protectedDataSharingContract.getAddress(), rpcURL);
    return { protectedDataSharingContract, appAddress, owner, addr1, addr2, addr3 };
  }

  async function createOneCollection() {
    const { protectedDataSharingContract, appAddress, addr1, addr2, addr3 } =
      await loadFixture(deploySCFixture);
    const tx = await protectedDataSharingContract.connect(addr1).createCollection();
    const receipt = await tx.wait();
    const collectionTokenId = ethers.toNumber(receipt.logs[0].args[2]);
    return {
      protectedDataSharingContract,
      collectionTokenId,
      appAddress,
      addr1,
      addr2,
      addr3,
    };
  }

  async function createTwoCollection() {
    const { protectedDataSharingContract, appAddress, addr1, addr2 } =
      await loadFixture(deploySCFixture);
    const tx1 = await protectedDataSharingContract.connect(addr1).createCollection();
    const receipt1 = await tx1.wait();
    const collectionTokenIdFrom = ethers.toNumber(receipt1.logs[0].args[2]);
    const tx2 = await protectedDataSharingContract.connect(addr2).createCollection();
    const receipt2 = await tx2.wait();
    const collectionTokenIdTo = ethers.toNumber(receipt2.logs[0].args[2]);
    return {
      protectedDataSharingContract,
      collectionTokenIdFrom,
      collectionTokenIdTo,
      appAddress,
      addr1,
      addr2,
    };
  }

  async function createAndAddProtectedDataToCollection(
    protectedDataSharingContract,
    collectionTokenId,
    appAddress,
    addr,
  ) {
    const protectedDataAddress = await createDatasetFor(addr.address, rpcURL);
    const registry = await ethers.getContractAt(
      'IRegistry',
      '0x799daa22654128d0c64d5b79eac9283008158730',
    );
    const protectedDataTokenId = ethers.getBigInt(protectedDataAddress.toLowerCase()).toString();
    await registry
      .connect(addr)
      .approve(await protectedDataSharingContract.getAddress(), protectedDataTokenId);
    await protectedDataSharingContract
      .connect(addr)
      .addProtectedDataToCollection(collectionTokenId, protectedDataAddress, appAddress);
    return { protectedDataAddress };
  }

  async function addProtectedDataToCollection() {
    const { protectedDataSharingContract, collectionTokenId, appAddress, addr1, addr2, addr3 } =
      await loadFixture(createOneCollection);

    const { protectedDataAddress } = await createAndAddProtectedDataToCollection(
      protectedDataSharingContract,
      collectionTokenId,
      appAddress,
      addr1,
    );
    return {
      protectedDataSharingContract,
      collectionTokenId,
      protectedDataAddress,
      appAddress,
      addr1,
      addr2,
      addr3,
    };
  }

  async function setProtectedDataForSale() {
    const {
      protectedDataSharingContract,
      collectionTokenIdFrom,
      collectionTokenIdTo,
      appAddress,
      addr1,
      addr2,
    } = await loadFixture(createTwoCollection);

    const { protectedDataAddress } = await createAndAddProtectedDataToCollection(
      protectedDataSharingContract,
      collectionTokenIdFrom,
      appAddress,
      addr1,
    );

    await protectedDataSharingContract
      .connect(addr1)
      .setProtectedDataForSale(collectionTokenIdFrom, protectedDataAddress, priceOption);

    return {
      protectedDataSharingContract,
      collectionTokenIdFrom,
      collectionTokenIdTo,
      protectedDataAddress,
      appAddress,
      addr2,
    };
  }

  describe('setProtectedDataForSale()', () => {
    it('should set protected data for sale', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);
      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      const saleParams = await protectedDataSharingContract.protectedDataForSale(
        collectionTokenId,
        protectedDataAddress,
      );
      expect(saleParams[0]).to.equal(true);
    });

    it('should emit ProtectedDataAddedForSale event', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption),
      )
        .to.emit(protectedDataSharingContract, 'ProtectedDataAddedForSale')
        .withArgs(collectionTokenId, protectedDataAddress, priceOption);
    });

    it('should revert if the user does not own the collection', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        addr2: notCollectionOwner,
      } = await loadFixture(addProtectedDataToCollection);

      await expect(
        protectedDataSharingContract
          .connect(notCollectionOwner)
          .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption),
      ).to.be.revertedWith("Not the collection's owner");
    });

    it('should revert if the protected data is not in the collection', async () => {
      const { protectedDataSharingContract, collectionTokenId, addr1 } =
        await loadFixture(createOneCollection);
      const protectedDataAddress = await createDatasetFor(addr1.address, rpcURL);

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption),
      ).to.be.revertedWith('ProtectedData is not in collection');
    });

    it('should revert if the protected data is currently available in subscription', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);
      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataToSubscription(collectionTokenId, protectedDataAddress);

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption),
      ).to.be.revertedWith('ProtectedData is available in subscription');
    });

    it('should revert if the protected data is available for renting', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);
      const durationOption = new Date().getTime();
      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataToRenting(
          collectionTokenId,
          protectedDataAddress,
          priceOption,
          durationOption,
        );

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption),
      ).to.be.revertedWith('ProtectedData available for renting');
    });

  describe('removeProtectedDataForSale()', () => {
    it('should remove protected data for sale', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);
      await protectedDataSharingContract
        .connect(addr1)
        .removeProtectedDataForSale(collectionTokenId, protectedDataAddress);

      const saleParams = await protectedDataSharingContract.protectedDataForSale(
        collectionTokenId,
        protectedDataAddress,
      );
      expect(saleParams[0]).to.equal(false);
    });

    it('should emit ProtectedDataRemovedFromSale event', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr1 } =
        await loadFixture(addProtectedDataToCollection);

      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .removeProtectedDataForSale(collectionTokenId, protectedDataAddress),
      )
        .to.emit(protectedDataSharingContract, 'ProtectedDataRemovedFromSale')
        .withArgs(collectionTokenId, protectedDataAddress);
    });

    it('should revert if the user does not own the collection', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        addr2: notCollectionOwner,
      } = await loadFixture(addProtectedDataToCollection);

      await expect(
        protectedDataSharingContract
          .connect(notCollectionOwner)
          .removeProtectedDataForSale(collectionTokenId, protectedDataAddress),
      ).to.be.revertedWith("Not the collection's owner");
    });

    it('should revert if the protected data is not in the collection', async () => {
      const { protectedDataSharingContract, collectionTokenId, addr1 } =
        await loadFixture(createOneCollection);

      const protectedDataAddress = await createDatasetFor(addr1.address, rpcURL);

      await expect(
        protectedDataSharingContract
          .connect(addr1)
          .removeProtectedDataForSale(collectionTokenId, protectedDataAddress),
      ).to.be.revertedWith('ProtectedData is not in collection');
    });
  });

  describe('buyProtectedDataForCollection()', () => {
    it('should buy protected data successfully', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenIdFrom,
        collectionTokenIdTo,
        protectedDataAddress,
        appAddress,
        addr2,
      } = await loadFixture(setProtectedDataForSale);

      await protectedDataSharingContract
        .connect(addr2)
        .buyProtectedDataForCollection(
          collectionTokenIdFrom,
          protectedDataAddress,
          collectionTokenIdTo,
          appAddress,
          {
            value: priceOption,
          },
        );
      const protectedDataId = ethers.getBigInt(protectedDataAddress.toLowerCase()).toString();
      expect(
        await protectedDataSharingContract.protectedDatas(collectionTokenIdTo, protectedDataId),
      ).to.equal(protectedDataAddress);
    });

    it('should emit ProtectedDataSold event', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenIdFrom,
        collectionTokenIdTo,
        protectedDataAddress,
        appAddress,
        addr2,
      } = await loadFixture(setProtectedDataForSale);

      await expect(
        protectedDataSharingContract
          .connect(addr2)
          .buyProtectedDataForCollection(
            collectionTokenIdFrom,
            protectedDataAddress,
            collectionTokenIdTo,
            appAddress,
            {
              value: priceOption,
            },
          ),
      )
        .to.emit(protectedDataSharingContract, 'ProtectedDataSold')
        .withArgs(
          collectionTokenIdFrom,
          await protectedDataSharingContract.getAddress(),
          protectedDataAddress,
        );
    });

    it('should revert if protected data is not for sale', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenIdFrom,
        collectionTokenIdTo,
        appAddress,
        addr1,
        addr2,
      } = await loadFixture(createTwoCollection);

      const { protectedDataAddress } = await createAndAddProtectedDataToCollection(
        protectedDataSharingContract,
        collectionTokenIdFrom,
        appAddress,
        addr1,
      );

      await expect(
        protectedDataSharingContract
          .connect(addr2)
          .buyProtectedDataForCollection(
            collectionTokenIdFrom,
            protectedDataAddress,
            collectionTokenIdTo,
            appAddress,
            {
              value: priceOption,
            },
          ),
      ).to.be.revertedWith('ProtectedData not for sale');
    });

    it('should revert if the wrong amount is sent', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenIdFrom,
        collectionTokenIdTo,
        protectedDataAddress,
        appAddress,
        addr2,
      } = await loadFixture(setProtectedDataForSale);

      await expect(
        protectedDataSharingContract.connect(addr2).buyProtectedDataForCollection(
          collectionTokenIdFrom,
          protectedDataAddress,
          collectionTokenIdTo,
          appAddress,
          { value: ethers.parseEther('0.8') }, // Sending the wrong amount
        ),
      ).to.be.revertedWith('Wrong amount sent');
    });

    it('should revert if the user does not own the target collection', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        appAddress,
        addr1,
        addr2,
        addr3,
      } = await loadFixture(addProtectedDataToCollection);

      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      const tx = await protectedDataSharingContract.connect(addr3).createCollection();
      const receipt = await tx.wait();
      const collectionTokenIdTo = ethers.toNumber(receipt.logs[0].args[2]);

      await expect(
        protectedDataSharingContract
          .connect(addr2)
          .buyProtectedDataForCollection(
            collectionTokenId,
            protectedDataAddress,
            collectionTokenIdTo,
            appAddress,
            {
              value: priceOption,
            },
          ),
      ).to.be.revertedWith("Not the collection's owner");
    });
  });

  describe('buyProtectedData()', () => {
    it('should buy protected data successfully', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        addr1,
        addr2,
      } = await loadFixture(addProtectedDataToCollection);

      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      await protectedDataSharingContract
        .connect(addr2)
        .buyProtectedData(collectionTokenId, protectedDataAddress, addr2.address, {
          value: priceOption,
        });
      const registry = await ethers.getContractAt(
        'IRegistry',
        '0x799daa22654128d0c64d5b79eac9283008158730',
      );
      const protectedDataTokenId = ethers.getBigInt(protectedDataAddress.toLowerCase()).toString();
      expect(await registry.ownerOf(protectedDataTokenId)).to.equal(addr2.address);
    });

    it('should emit ProtectedDataSold event', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        addr1,
        addr2,
      } = await loadFixture(addProtectedDataToCollection);

      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      await expect(
        protectedDataSharingContract
          .connect(addr2)
          .buyProtectedData(collectionTokenId, protectedDataAddress, addr2.address, {
            value: priceOption,
          }),
      )
        .to.emit(protectedDataSharingContract, 'ProtectedDataSold')
        .withArgs(collectionTokenId, addr2.address, protectedDataAddress);
    });

    it('should revert if protected data is not for sale', async () => {
      const { protectedDataSharingContract, collectionTokenId, protectedDataAddress, addr2 } =
        await loadFixture(addProtectedDataToCollection);

      await expect(
        protectedDataSharingContract
          .connect(addr2)
          .buyProtectedData(collectionTokenId, protectedDataAddress, addr2.address, {
            value: priceOption,
          }),
      ).to.be.revertedWith('ProtectedData not for sale');
    });

    it('should revert if the wrong amount is sent', async () => {
      const {
        protectedDataSharingContract,
        collectionTokenId,
        protectedDataAddress,
        addr1,
        addr2,
      } = await loadFixture(addProtectedDataToCollection);

      await protectedDataSharingContract
        .connect(addr1)
        .setProtectedDataForSale(collectionTokenId, protectedDataAddress, priceOption);

      await expect(
        protectedDataSharingContract.connect(addr2).buyProtectedData(
          collectionTokenId,
          protectedDataAddress,
          addr2.address,
          { value: ethers.parseEther('0.8') }, // Sending the wrong amount
        ),
      ).to.be.revertedWith('Wrong amount sent');
    });
  });
});
