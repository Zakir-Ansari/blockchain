# Campaign Funding (Decentralized Application)

**Objective**: We are going to create a Campaign Fund Management Decentralized Application (DApp) to provide users an interface to create their Campaigns and raise funds for the same.

- Every Campaign will have a target fund amount and a target date to collect the amount.

- Every user will be able to login through their wallet and create campaigns.

- Every user will be able to receive and transfer in Holesky currency.

Before starting development, let's understand the tool and framework we are going to use while the development process.

## Thirdweb

![](../Resources/Campaign%20Funding%20DApp/Thirdweb-Logo.png)

Thirdweb is an online platform that provides developer tools to build, manage, and analyze web3 apps. It's a complete package that provides multiple SDKs with a clean UI and interactive pages to work with your DApps.

## Hardhat

![](../Resources/Campaign%20Funding%20DApp/Hardhat-logo.jpg)

It is an open-source Ethereum development environment for building and for testing smart contracts on the Ethereum [blockchain](https://shardeum.org/blog/what-is-blockchain/). It provides powerful tools and features, including a built-in Solidity compiler, testing framework, debugging tool, deployment tool, and plugin system.

With Hardhat, developers can write, compile, test, and deploy their smart contracts securely and efficiently. Its user-friendly interface and comprehensive documentation make it a popular choice among developers, whether they’re just starting or have years of experience in Ethereum development. Read more about it at [Documentation | Ethereum development environment for professionals by Nomic Foundation](https://hardhat.org/docs)

## Holesky

![](../Resources/Campaign%20Funding%20DApp/Holesky-Logo.png)

The Holesky testnet is replacing the Goerli testnet for the Ethereum network. The new testnet will serve as a test environment for staking features, infrastructures, and protocols. The Sepolia testnet will remain the recommended testnet for EVM-related applications.

Holesky ETH tokens are needed to interact with the Holesky network. You can currently claim Holesky tokens from the Holešky PoW Faucet and the Quicknode Faucet. We recommend the Holešky PoW Faucet, as you can claim a maximum of 33 HolETH, while Quicknode is limited to 5 HolETH.

To add Holesky Testnet to your wallet, go to 'Add a Network Manually' and enter below details:

- **Network name**: Holesky Testnet
- **Network URL**: [https://ethereum-holesky.publicnode.com](https://ethereum-holesky.publicnode.com/)
- **Chain ID**: 17000
- **Currency symbol**: ETH
- **Block explorer URL**: [https://holesky.beaconcha.in](https://holesky.beaconcha.in/)

## DApp Development

Command to create smart contract application (DApp) using Thirdweb:

```bash
npx thirdweb@latest create --contract
```

It will ask you the project details like:

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

**Project structure**:

![](../Resources/Campaign%20Funding%20DApp/ThirdWebProjectStructure.JPG)

**What did we get in our project -**

**hardhat.config.ts**

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

**package.json**

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

To keep our app as secure as possible, we are going to use dotenv and keep our environment variable safe. To do so, install dotenv package:

```bash
npm install dotenv
```

This will instantly add "dotenv": "^16.4.5" in the dependencies

```json
"dependencies": {
    "@thirdweb-dev/contracts": "^3.8.0",
    "dotenv": "^16.4.5",
    "zksync-web3": "^0.14.3"
  }
```

Now, it's time to work on our contract. Rename the Contract.sol file inside the contract folder to CampaignFunding.sol and the code of our contract will look like this:

```solidity
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
```

Now, that we are ready with our contract, we have to configure the deployment of our smart contract using **hardhat.config.js**
But before anything, we have to have our own **Metamask Wallet**.

Steps to configure your metamask:

1. Go to https://metamask.io/ and download the metamask. That will redirect you to Chrome web store. Add the Metamask extension. Once the installation is done, the get started page will appear.

   ![](../Resources/Campaign%20Funding%20DApp/Metamask-Getstarted.JPG)

2. Check the agreement and Create a new wallet. Follow the steps to create a wallet.

3. Once you are ready with your wallet -> add it to your extension for ease of access.

4. You can now see your wallet appear like this:

   ![](../Resources/Campaign%20Funding%20DApp/Metamask-wallet-home.JPG)

5. Select Ethereum Mainnet and switch the toggle to show test networks. Then select 'Add network' and then use Holesky Testnet details (mentioned in the Holesky section above) to add it.

6. Now we have to get some funds. You can get free Sepolia and Holesky Faucets here: https://faucets.pk910.de/

7. Once we get some funds, we are ready to start the deployment of our contract. For that, we will need our private key to use in our smart contract application. Click on the account in your metamask wallet and follow the steps to fetch the private key.

8. Save your private key in the env variable of your code. To do so, create a new .env file in your project and put the private key there.

   ```bash
   PRIVATE_KEY=<Your Private Key>
   ```

9. We are ready to use our private key, to connect to the Holesky or Sepolia network. Go to [Your Instant RPC Gateway to Ethereum](https://www.ankr.com/rpc/eth/). Select Testnet and then Holesky and copy the HTTPS endpoint.

   ![](../Resources/Campaign%20Funding%20DApp/RPC-ETH-Endpoints.JPG)

10. Configure the endpoint in hardhad.config.js file like below:

    ```javascript
    solidity: {
        version: "0.8.17",
        defaultNetwork: "holesky",
        networks: {
          hardhat: {},
          holesky: {
            url: "https://rpc.ankr.com/eth_holesky",
            accounts: [`0x${process.env.PRIVATE_KEY}`],
          },
        },
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ```

11. With that said, we can go ahead and deploy our contract. To deploy the contract, go to your contract project folder and run `npm run deploy`

    ```powershell
    PS E:\Code_Space\VSCode\Blockchain\blockchain\Campaign Funding DApp\web3> npm run deploy

    > deploy
    > npx thirdweb@latest deploy

        $$\     $$\       $$\                 $$\                         $$\
        $$ |    $$ |      \__|                $$ |                        $$ |
      $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\
      \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\
        $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
        $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
        \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
         \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/

     💎 thirdweb v0.13.56 💎

    Automatically attempting to open a link to authenticate with our dashboard...

    ⠴ Waiting for a response from the dashboard

    Successfully linked your account to this device
    ✔ Detected project type: hardhat
    ⠋ Compiling project...
    ✔ Compilation successful
    ✔ Processing contract: "CampaignFunding"
    ✔ Upload successful
    ✔ Open this link to deploy your contracts: https://thirdweb.com/contracts/deploy/QmXjgvsgm43uCqRoVE3pmKFG6v4rmVUazwpNURxKuKG9jE
    ```

12. The contract data is uploaded straight to the Thirdweb dashboard. You will see, that new folders will get created in your project as artifacts and cache. After all these, we have to now deploy our contract using the 'link to deploy contracts' in the above console output. Go to the link and deploy the contract.

    ![](../Resources/Campaign%20Funding%20DApp/Thirdweb-Deploy-Now.JPG)

    Click on **Deploy Now**, and you will get prompted by Metamask Wallet for the transaction required to deploy this contract. Follow the steps.

13. After successful deployment, you will be redirected to the deployed contract Overview page. Navigate to Explorer and you will see your contract interactive functions:

    ![](../Resources/Campaign%20Funding%20DApp/Thirdweb-Deployed-Explorer.JPG)

    The best part of Thirdweb is its simplicity and polished GUI. You will have a good insight into your contract with interactive features.

    It also provides code snippets to give ease of use of this contract to any of your projects (i.e. Javascript, React, Python, and more)

    ![](../Resources/Campaign%20Funding%20DApp/Thirdweb-Code-Snippet.JPG)

    **Note**: The hashcode below the contract name (CampaignFunding) is the address of our contract, that we use to connect it with any other application (UI or REST API).

With that said, the first part of our application, i.e. our contract has been developed, deployed, and live on the internet with an address associated with it.

In the next part, we will see how to interact with our contract through other applications.

## Client Development
