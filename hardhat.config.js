require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
const { prepareNetworkConfigs } = require('./utils/configs');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

function prepareHardhatConfigs() {
  // The hardhat config object will be returned.
  const config = {
    networks: prepareNetworkConfigs(['mainnet', 'rinkeby', 'kovan', 'ropsten', 'goerli']),
    solidity: {
      version: '0.8.4',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },

    // Named accounts for plugin `hardhat-deploy`
    namedAccounts: {
      deployer: 0,
    },

    
    paths: {
      tests: './test',
    },

    // Remove console.log when deploying to public networks
    /*
    preprocess: {
      eachLine: removeConsoleLog(
        (hre) => hre.network.name !== 'hardhat' && hre.network.name !== 'localhost'
      ),
    },
    */

    /**
     * gas reporter configuration that let's you know
     * an estimate of gas for contract deployments and function calls
     * More here: https://www.npmjs.com/package/hardhat-gas-reporter
    
    gasReporter: {
      currency: 'USD',
      gasPrice: 50,
      enabled: !!process.env.REPORT_GAS,
      coinmarketcap: process.env.COINMARKETCAP_API_KEY,
      maxMethodDiff: 10,
    },
     */
  };

  // Hardhat plugin for integration with Tenderly.
  // This plugin adds `tenderly:verify` task and `tenderly:push` task to Hardhat.
  // To use this plugin, you will need to exec `tenderly login` first on the `tenderly-cli`
  // More here: https://www.npmjs.com/package/@tenderly/hardhat-tenderly
  /*
  if (process.env.TENDERLY_PROJECT_ID && process.env.TENDERLY_USERNAME) {
    config.tenderly = {
      project: process.env.TENDERLY_PROJECT_ID,
      username: process.env.TENDERLY_USERNAME,
    };
  }
  */
  // Hardhat plugin for integration with Etherscan's contract verification service.
  // Provides the verify task, which allows you to verify contracts through Etherscan's service.
  if (process.env.ETHERSCAN_API_KEY) {
    config.etherscan = {
      apiKey: process.env.ETHERSCAN_API_KEY,
    };
  }

  return config;
}

module.exports = prepareHardhatConfigs();
