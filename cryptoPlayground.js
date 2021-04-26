const axios = require('axios');

const path = require('path');
require('dotenv').config({path: __dirname+'/alcheMeta.env'});
const { PIN_GATEWAY , IPFS_HASH_COHORT25 } = process.env;

console.log(PIN_GATEWAY)
console.log(IPFS_HASH_COHORT25)


async function getSecret(hashKey) {
  await axios.get(hashKey)
}












