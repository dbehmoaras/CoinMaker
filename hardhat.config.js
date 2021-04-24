/**
* @type import('hardhat/config').HardhatUserConfig
*/
const path = require('path');
console.log(__dirname)
require('dotenv').config({path: __dirname+'/alcheMeta.env'});
const { API_URL, PRIVATE_KEY } = process.env;
console.log(API_URL)

require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}