const { providers } = require("ethers");
const {network, ethers} = require("hardhat");
const hre = require("hardhat");

async function main(){
    const [deployer, user, third] = await ethers.getSigners();
    console.log("second private key: ", typeof user);
    /*
        Hardhat will auto *new* one provider with RPC_URL.
        In fact, it did work 'const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)' for you.
    */
   //getBalance(address) easy to understand
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`\nETH Balance of ${deployer.address} --> ${ethers.utils.formatEther(balance)} ETH\n`);
    //getNetwork()  
    const net = await ethers.provider.getNetwork();
    console.log("network: ",net);
    /**
        network:  {                                           
            name: 'kovan',
            chainId: 42,
            ensAddress: null,
            _defaultProvider: [Function: func] { renetwork: [Function (anonymous)] }
        }  
     */
    //getTransactionCount(address)
    const TransactionCount = await ethers.provider.getTransactionCount(deployer.address);
    console.log(`\nTransaction Count of ${deployer.address} --> ${TransactionCount} txs\n`);

    const Accounts = await ethers.provider.listAccounts();
    for (const account of Accounts) {
        console.log(account);
    }
    const second = await ethers.provider.getSigner(Accounts[1]);
    console.log("Index 2 address: ",second.getAddress());


    ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
    });

    ethers.provider.getGasPrice().then((gasPrice) => {
        // gasPrice is a BigNumber; convert it to a decimal string
        gasPriceString = gasPrice.toString();
    
        console.log("Current gas price: " + gasPriceString);
    });
    
    const transactionHash = '0xfc0b1ebb462ea8e3c8a067e4f9da83a7b1278d1dbb53277495dcd77bbfb3a97f';
    ethers.provider.getTransaction(transactionHash).then((transaction) => {
        console.log(transaction);
    });
    
    ethers.provider.getTransactionReceipt(transactionHash).then((receipt) => {
        console.log(receipt);
    });
    
    //only call on mainnet
    /*
    const tmp_address = await ethers.provider.resolveName("shenstone.eth");
    console.log("ens address: " + tmp_address);


    const ens_name = await ethers.provider.lookupAddress(tmp_address);
    console.log("ENS Name: " + ens_name);
    */
    
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 