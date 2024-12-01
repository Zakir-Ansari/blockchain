const contract = require("../smart-contract/campaignManagementSmartContract");
const { readContract } = require("thirdweb");
const { formatData } = require("../helpers/util");

exports.getFunds = (req, res, next) => {
  readContract({
    contract,
    method:
      "function getCampaigns() view returns ((uint256 id, address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations, bool isDeleted)[])",
    params: [],
  })
    .then((response) => {
      const formattedResponse = formatData(response);
      res.status(200).json(formattedResponse);
    })
    .catch((error) => {
      next(error);
    });
};
