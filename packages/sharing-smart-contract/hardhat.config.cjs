require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { WALLET_PRIVATE_KEY } = process.env;

const bellecourBase = {
  gasPrice: 0,
  blockGasLimit: 6_700_000,
  hardfork: 'berlin',
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // run `npx hardhat node` to start the forked bellecour node "local-bellecour-fork"
  defaultNetwork: 'local-bellecour-fork',
  networks: {
    hardhat: {
      ...bellecourBase,
      chainId: 134,
      forking: {
        enabled: true,
        url: 'https://bellecour.iex.ec',
      },
    },
    'local-bellecour-fork': {
      ...bellecourBase,
      url: 'http://127.0.0.1:8545',
    },
    'ci-bellecour-fork': {
      ...bellecourBase,
      url: 'http://bellecour-fork-node:8545',
    },
    bellecour: {
      ...bellecourBase,
      url: 'https://bellecour.iex.ec',
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : [],
    },
  },
  // gas reporter
  gasReporter: {
    enabled: true,
  },
  // to verify contract on Blockscout
  etherscan: {
    apiKey: {
      bellecour: 'abc',
    },
    customChains: [
      {
        network: 'bellecour',
        chainId: 134,
        urls: {
          apiURL: 'https://blockscout-bellecour.iex.ec/api',
          browserURL: 'https://blockscout-bellecour.iex.ec',
        },
      },
    ],
  },
  // compiler version
  solidity: {
    version: '0.8.23',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
