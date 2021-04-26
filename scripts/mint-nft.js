const path = require('path');
console.log(__dirname)
require('dotenv').config({path:'/home/david/Dropbox/HackCentral/ImmersiveGit/classRepo/scratchProj/CoinMaker/alcheMeta.env'});
const { API_URL , PRIVATE_KEY , PUBLIC_KEY , IPFS_HASH_COHORT25 , PIN_GATEWAY } = process.env;
console.log(API_URL)


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = new createAlchemyWeb3("https://eth-ropsten.alchemyapi.io/v2/Q6DLGfQL7ycNsgHRkfQc3MrQmUXg6sR9");



const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
console.log(contract.abi);
const contractAddress = "0x812b2785f56f229b18ce1d3a8f29f8227225d4d9";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);



async function mintNFT(tokenURI){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');

  //the transaction:
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}

mintNFT(`${PIN_GATEWAY}${IPFS_HASH_COHORT25}`);
//node scripts/mint-nft.js
//node scripts/mint-nft.js