require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(["https://eth-ropsten.alchemyapi.io/v2/Q6DLGfQL7ycNsgHRkfQc3MrQmUXg6sR9"]);



const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// console.table(JSON.stringify(contract.abi));
const contractAddress = "0x812b2785f56f229b18ce1d3a8f29f8227225d4d9";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount("0x7709c76de4add704c3ee81272f2b78b943ceb368", 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': "0x7709c76de4add704c3ee81272f2b78b943ceb368",
    'to': "0x812b2785f56f229b18ce1d3a8f29f8227225d4d9",
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT("0x7709c76de4add704c3ee81272f2b78b943ceb368", tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, "dcd0b28ff35020f6d49f8e817f81397e829925abf6e7b1a1155cb7005f51fa19");
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("Something went wrong when submitting your transaction:", err);
      }
    })
  }).catch((err) => {
    console.log(" Promise failed:", err);
  })
}​
mintNFT("https://gateway.pinata.cloud/ipfs/QmTtcFD3RqF4eRStSqRbYnoQ4MquEginASgrpPMzY9BadT")