const fs = require('fs');
const { utils } = require('ethers');
const { isAddress, getAddress, formatUnits, parseUnits } = utils;

// At this moment can not get test helper's `time` function working,
// Beacuse of the init parameters is hardcoded,
// To make this test case work, we need to adjust some parameters
// in `Membership.sol` when initializing the contract:
// votingDelay_: 0,
// votingPeriod_: 2,
// proposalThreshold_: 1,
// quorumNumerator_: 3,
// treasury_: new Treasury(1, _proposers, _executors)

const chainIds = {
    arbitrumOne: 42161,
    avalanche: 43114,
    bsc: 56,
    hardhat: 31337,
    mainnet: 1,
    optimism: 10,
    polygon: 137,
    rinkeby: 4,
    ropsten: 3,
};

module.exports.prepareNetworkConfigs = function (networks) {
  const mainnetGwei = 21;
  const currentRelay = process.env.DEFAULT_RELAY || 'infura';
  const hardhatLocalConfig = {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    localhost: {
      url: 'http://localhost:8545',
    },
  };

  // To use this feature you need to connect to an archive node.
  // At this moment it's hardcoded to alchemy archive code.
  if (process.env.FORK_MAINNET && process.env.ALCHEMY_API_KEY) {
    hardhatLocalConfig.hardhat.forking = {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    };
  }

  return networks.reduce((acc, network) => {
    acc[network] = {
      url: relayURLs(network)[currentRelay],
      accounts: {
        mnemonic: getMnenomic(),
      },
      gas: 8000000,
      gasPrice:30000000000,
      chainId: chainIds.network
    };

    if (network === 'mainnet') {
      acc[network].gasPrice = mainnetGwei * 1000000000;
    }

    return acc;
  }, hardhatLocalConfig);
};

function relayURLs(network) {
  return {
    infura: `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  };
}

function getMnenomic() {
  const filePath = process.env.MNEMONIC_PATH || './mnemonic.txt';

  try {
    return fs.readFileSync(filePath).toString().trim();
  } catch (err) {
    return 'get mnemonic failed';
  }
}