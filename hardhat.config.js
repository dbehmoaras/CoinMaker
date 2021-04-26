/**
* @type import('hardhat/config').HardhatUserConfig
*/
const path = require('path');
require('dotenv').config({path: __dirname+'/alcheMeta.env'});
const { API_URL, PRIVATE_KEY } = process.env;


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