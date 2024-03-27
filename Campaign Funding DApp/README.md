# Campaign Funding (Decentralized Application)

Command to create smart contract application using thirdweb:

```bash
npx thirdweb@latest create --contract
```

It will ask you the project detials like:

```bash
tps://docs.safe.global/safe-core-aa-sdk/protocol-kit/reference/v1

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |     
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.13.55 💎

√ What is your project named? ... web3
√ What framework do you want to use? » Hardhat
√ What will be the name of your new smart contract? ... CampaignFundContract    
√ What type of contract do you want to start from? » Empty Contract
Creating a new thirdweb contracts project in E:\Code_Space\VSCode\Blockchain\blockchain\Campaign Funding DApp\web3.

Downloading files. This might take a moment.
Installing packages. This might take a couple of minutes.

npm WARN deprecated zksync-web3@0.14.4: This package has been deprecated in favor of zksync-ethers@5.0.0

added 333 packages, and audited 334 packages in 1m

70 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Success! Created web3 at E:\Code_Space\VSCode\Blockchain\blockchain\Campaign Funding DApp\web3

Inside that directory, you can run several commands:

  npm run build
    Compiles your contracts and detects thirdweb extensions implemented on them.
  npm run deploy

  npm run publish
    Publishes your contracts with the thirdweb publish flow.
```

Project structure:

![](../Resources/Campaign%20Funding%20DApp/ThirdWebProjectStructure.JPG)

What do we have in our project - 

hardhat.config.ts

```ts
require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

```

package.json

```json
{
  "name": "hardhat-javascript-starter",
  "scripts": {
    "build": "npx thirdweb@latest detect",
    "deploy": "npx thirdweb@latest deploy",
    "release": "npx thirdweb@latest release"
  },
  "devDependencies": {
    "@matterlabs/hardhat-zksync-solc": "^0.3.17",
    "hardhat": "^2.13.0"
  },
  "dependencies": {
    "@thirdweb-dev/contracts": "^3.8.0",
    "zksync-web3": "^0.14.3"
  }
}

```

To keep our app as secure as possible, we are going to use doenv, to keep our environment variable safe. To do so, install dotenv package

```bash
npm install dotenv
```

This will instantly add "dotenv": "^16.4.5" in dependencies

```json
"dependencies": {
    "@thirdweb-dev/contracts": "^3.8.0",
    "dotenv": "^16.4.5",
    "zksync-web3": "^0.14.3"
  }
```

Now, it's time to work on our contract. Rename the Contract.sol file inside contract folder to CampaignFunding.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CampaignFunding {
    struct Campaign {
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
    }

    // create an object of campaigns
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

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
}
```

Now, that we are ready with our contract, we have to configure the deploy our smart contract using hardhat.config.js.
But before anything, we have to have our own Metamask Wallet.

Steps to configure your metamask:

1. Go to https://metamask.io/ and download the metamask. That will redirect you to chrome webstor. Add the Metamask extension. Once the installation is done, get started page will appear.
   
   ![](../Resources/Campaign%20Funding%20DApp/Metamask-Getstarted.JPG)

2. Check the agreement and Create a new wallet. Follow the steps to create wallet.

3. Once you are ready with your wallet -> add it your extension for ease of access.

4. You can now see you wallet appear right like this:
   
   
   
   
   
   
   
   
   ![](../Resources/Campaign%20Funding%20DApp/Metamask-wallet-home.JPG)

5. Selecte Ethereum Mainnet and switch the toggle to show test networks. Then selected <TBD>

6. Now we have to get some funds. Copy the account address
