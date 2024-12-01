// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CampaignFunding {
    struct Campaign {
        uint256 id; // Campaign ID
        address owner;
        string title;
        string description;
        // target amount to collect
        uint256 target;
        // time to reach the target amount
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isDeleted; // Flag to mark campaign as deleted
    }

    // create an object of campaigns
    mapping(uint256 => Campaign) public campaigns;

    event CampaignDeleted(uint256 id);

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.id = numberOfCampaigns;
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isDeleted = false;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        require(!campaign.isDeleted, "Campaign is deleted!");
        require(
            campaign.deadline > block.timestamp,
            "Campaign is not active!"
        );


        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function deleteCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(campaign.owner == msg.sender, "Only the owner can delete the campaign.");
        require(!campaign.isDeleted, "Campaign is already deleted.");

        campaign.isDeleted = true;
        emit CampaignDeleted(_id);
    }
}