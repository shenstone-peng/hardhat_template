//const { ethers } = require("ethers");
const {network, ethers} = require("hardhat")
//const INFURA_ID = ''
//const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const DaiContract = new ethers.Contract(address, ERC20_ABI, ethers.provider)

const main = async () => {
    const block = await ethers.provider.getBlockNumber()

    //const transferEvents = await DaiContract.queryFilter('Transfer', block - 1, block)
    //console.log(transferEvents)
    /*
    DaiContract.on("Transfer", (from, to, amount, event) => {
        console.log(`${ from } sent ${ ethers.utils.formatEther(amount) } to ${ to}`);
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
    });
    */
    ethers.provider.on("pending", (tx) => {
        console.log(`here: ${tx}`)
        // Emitted when any new pending transaction is noticed
    });
    

}

main()