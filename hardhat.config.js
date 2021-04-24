/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: "https://eth-ropsten.alchemyapi.io/v2/Q6DLGfQL7ycNsgHRkfQc3MrQmUXg6sR9",
         accounts: ["0xdcd0b28ff35020f6d49f8e817f81397e829925abf6e7b1a1155cb7005f51fa19"]
      }
   },
}