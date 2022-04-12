const { providers } = require("ethers");
const {network, ethers} = require("hardhat");
const hre = require("hardhat");

async function main(){
    const [deployer, user, third] = await ethers.getSigners();
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`\nETH Balance of ${deployer.address} --> ${ethers.utils.formatEther(balance)} ETH\n`);
    
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 