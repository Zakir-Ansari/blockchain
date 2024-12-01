const { createThirdwebClient, getContract } = require("thirdweb");
const { defineChain } = require("thirdweb/chains");

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: process.env.CLIENT_ID,
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(17000),
  address: process.env.CAMPAIGN_FUNDING_SMART_CONTRACT_ADDRESS,
});

module.exports = contract;
