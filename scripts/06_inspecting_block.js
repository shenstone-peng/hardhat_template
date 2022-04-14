const { network, ethers } = require("hardhat");

//const INFURA_ID = ''
//const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
    const block = await ethers.provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await ethers.provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await ethers.provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()