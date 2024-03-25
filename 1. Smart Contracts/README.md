# Solidity & Smart Contracts

Before starting up with Solidity and Smart Contracts, let's understand some basic terms.

## Blockchain

![](../Resources/Smart%20Contracts/Blockchain.JPG)

Blockchain is a specific type of database that links together a set of blocks, each containing specific information. And as the new data enters the block, they are chronologically chained to the existing blockchain. Moreover, it refers to a relatively new technology that offers a great number of use cases. It can store various data, though its many use cases serve as a ledger for transactions. The great thing about blockchain is that it may be used in a decentralized manner. As such, no single entity is behind the technology, which ensures safety and transparency. But it’s important to note that blockchains can also be centralized.

## EVM

![](../Resources/Smart%20Contracts/EVM.png)

[EVM](https://moralis.io/evm-explained-what-is-ethereum-virtual-machine/?utm_source=blog&utm_medium=post&utm_campaign=Remix%2520Explained%2520%25E2%2580%2593%2520What%2520is%2520Remix%253F) stands for “Ethereum Virtual Machine”. It is essentially what powers the entire Ethereum ecosystem – a blockchain-based software platform. It enables developers to [create decentralized applications](https://moralis.io/how-to-create-smart-contracts/?utm_source=blog&utm_medium=post&utm_campaign=Remix%2520Explained%2520%25E2%2580%2593%2520What%2520is%2520Remix%253F) (dApps) on top of it.

## Smart Contract

![](../Resources/Smart%20Contracts/Title-What-is-a-Smart-Contract.jpeg)

A smart contract is a self-executing program that automates the actions required in an agreement or contract. Once completed, the transactions are trackable and irreversible.

Smart contracts permit trusted transactions and agreements to be carried out among disparate, anonymous parties without the need for a central authority, legal system, or external enforcement mechanism.

### Smart Contract Uses

Because smart contracts execute agreements, they can be used for many different purposes. One of the simplest uses is ensuring transactions between two parties occur, such as the purchase and delivery of goods. For example, a manufacturer needing raw materials can set up payments using smart contracts, and the supplier can set up shipments. Then, depending on the agreement between the two businesses, the funds could be transferred automatically to the supplier upon shipment or delivery.

Real estate transactions, stock and commodity trading, lending, corporate governance, supply chain, dispute resolution, and healthcare are only a few examples where smart contracts can be used.

### Smart Contract Pros and Cons

The primary benefit of smart contracts is similar to the benefit of blockchain technology—they remove the need for third parties. Other benefits of this technology are:

- **Efficiency**: They speed up contract execution
- **Accuracy**: There can be no human error introduced
- **Immutability**: The programming cannot be altered

Some of the downfalls of smart contracts are:

- **Permanent**: They cannot be changed if there are mistakes
- **Human factor**: They rely on the programmer to ensure the code addresses the terms of the contract
- **Loopholes**: There may be loopholes in the coding, allowing for contracts to be executed in bad faith

## Solidity

![](../Resources/Smart%20Contracts/Solidity-Logo.png)

Solidity is an object-oriented [programming language](https://www.simplilearn.com/best-programming-languages-start-learning-today-article "programming language") created specifically by the Ethereum Network team for constructing and designing [smart contracts](https://www.simplilearn.com/tutorials/blockchain-tutorial/what-is-smart-contract "smart contracts") on Blockchain platforms.

- It's used to create smart contracts that implement business logic and generate a chain of transaction records in the blockchain system.
- It acts as a tool for creating machine-level code and compiling it on the Ethereum Virtual Machine (EVM).

## MetaMask

![](../Resources/Smart%20Contracts/Blog-MetaMask-Logo.png)

[**MetaMask**](https://moralis.io/metamask-explained-what-is-metamask/?utm_source=blog&utm_medium=post&utm_campaign=Remix%2520Explained%2520%25E2%2580%2593%2520What%2520is%2520Remix%253F) is one of the most popular wallets for storing coins and tokens (aka cryptocurrencies). The great thing about MetaMask is that it also serves as a gateway to access Web3 applications. You can also use MetaMask for authentication.

## Remix IDE

![](../Resources/Smart%20Contracts/remix-logo.png)

It is an open-source web and desktop application, a development environment, if you will. It packs a rich set of plugins and fosters a fast development cycle via intuitive GUI. Moreover, Remix IDE is primarily used for the entire process of smart contract development. In addition, it serves as a playground for teaching and learning how to use the Ethereum network.

Launch Remix Online IDE here: https://remix.ethereum.org/ and it will look like this:

![](../Resources/Smart%20Contracts/Remix-IDE-Home.JPG)

### First Solidity Contract

Objective: Create a Property Will Contract for a grandfather to distribute his property among his grandchildren when he passes away.

1. Create a file under contract as Will.sol under contracts.

2. Define the license on top
   
   ```solidity
   // SPDX-License-Identifier: GPL-3.0
   ```

3. Setup solidity by importing pragma
   
   ```solidity
   pragma solidity >=0.7.0 <0.9.0;
   ```

4. Create the contract
   
   ```solidity
   contract Will {
       // set up the address of the owner
       address owner;
       uint fortune;
       // variable to find if the grandfather has passed away
       bool deceased;
   
       // payable - to allow this function to send and receive either
       contructor() payable {
           owner = msg.sender;     // represents address of this contract caller
           fortune = msg.value;    // tells us how much ether is being sent as value
           deceased = false;       // initially when the contract is initiated, we suppose grandfather is still alive
       }
   
       // create modifier so the only person who can call the contract is the owner
       modifier onlyOwner {
           require(msg.sender == owner);
           _;      // this underscore tells the function to shift back to the main function, basically we are preventing others from executing this contract, except the owner
       }
   
       // create a modifier so that we only allocate funds if Grandpa is deceased
       modifier mustBeDeceased {
           require(deceased == true);
           _;      // this underscore tells the function to shift back to the main function, basically we are preventing the execution if the owner is not deceased
       }
   
       // list of family address
       address payable[] familyWallets;
   
       // map through inheritance
       mapping (address => uint) inheritance;
   
       // set inheritance for each address
       function setInheritance(address payable wallet, uint amount) public onlyOwner {
           familyWallets.push(wallet);
           inheritance[wallet] = amount;
       }
   
       // pay each family member based on their wallet address
       function payout() private mustBeDeceased {
           for(uint i = 0; i < familyWallets.length; i++) {
               // transfer the funds from the contract address to receiver address
               familyWallets[i].transfer(inheritance[familyWallets[i]]);
           }
       }
   
       function isDeceased() public onlyOwner {
           deceased = true;
           payout();
       }
   }
   ```

5. Turn the Will contract to dApp and to do so, first, we need to compile our contract.
   
   ![](../Resources/Smart%20Contracts/remix-compiler1.JPG)
   
   Once it is compiled, you can see the Compilation Details for more.

6. Next is to deploy our contract, which is just below the compiler module. Deployment is important for a contract to run its internal functions. 
   
   ![](../Resources/Smart%20Contracts/deploy1.JPG)
   
   Under deploy, you see -
   
   - **Environment** - To deploy a smart contract, we need an environment that executes smart contracts and computes the state of network. In our case, we can use Remix provided VM i.e. Remix VM.
   
   - **Accounts** - Test ether accounts to run our contracts with.
   
   - **Gas Limit** - Shows the available gas fee amount for your contract. It is a safety precaution that works to stop blocks from using too many computing resources. Transactions get rejected and excluded from the block if the total gas consumption of all the transaction in the block is more than the block gas limit.
   
   - **Value** - the amount of ether that the currently selected account is going to allocate into our smart contract. And eventually, it will become the **owner** of the contract. The value is in **wei**, which is smallest unit of ether.
     
     Put 30 as value and ether as a unit for our contract.

7. Now, everything is ready. Go ahead and hit Deploy.
   
   ![](../Resources/Smart%20Contracts/Deployed1.JPG)
   
   Console output:
   
   ```bash
   status    0x1 Transaction mined and execution succeed
   transaction hash    0x487554139cecaf6c2a9367a8a869316bee8f8014c3ca1d11052cd199797d6271
   block hash    0x4b70c177458195ac939e25d8888d88ca75486cfd979a344afce04305f662ace5
   block number    1
   contract address    0xd9145CCE52D386f254917e481eB44e9943F39138
   from    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
   to    Will.(constructor)
   gas    384839 gas
   transaction cost    334718 gas 
   execution cost    263174 gas 
   input    0x608...80033
   decoded input    {}
   decoded output     - 
   logs    []
   value    30000000000000000000 wei
   ```
   
   - Amount of 30 ether has been deducted from the current owner's account
   
   - Under deployed contracts - you will see the function we have 
   
   - defined in our contract

8. Now, that our contract has been deployed, How do we actually interact with our contract? Let's check.
   
   Under the deployed contract, we have 2 interactive buttons
   
   ![](../Resources/Smart%20Contracts/Deployed-Contract-Buttons.JPG)
   
   This provides us with everything we need to run this smart contract. So, let's go ahead and test this smart contract.

9. First, set the inheritance, by putting wallet addresses and amounts. You can get the list of accounts from the accounts dropdown:
   
   ![](../Resources/Smart%20Contracts/Accounts-List.JPG)
   
   Just select the account and copy the address. Then use it under setInheritance options:
   
   ![](../Resources/Smart%20Contracts/setInheritance.JPG)
   
   **Note**: the amount is in Wei, so we have to add those extra zeros to make it an ether unit.
   
   Hit the transact button and it will add the account as the family member of the owner. Similarly, add another account as a family member with their wallet address and some amount. Let's say, member 1 is getting 25 ethers and member 2 is getting 5 ethers.
   
   **Remember**: While deploying the contract, the owner had given 30 ether. So, he can only set the inheritance amount sum, up to 30 ethers.
   (Grandpa's transaction to deploy the contract i.e. 30 >= Sum of amount to be transfered to each family member i.e. 25 + 5)
   
   If you try to execute the transaction, with more than 30 ether, the contract will throw an error.
   
   Console output of the transaction.
   
   ```shell
   status    0x1 Transaction mined and execution succeed
   transaction hash    0x7ca2a27d43548584da028a21e0e6b0232fb39e1099bfc4b8b3884ed6ee5e58ee
   block hash    0xd192a29f9d8b8875560b2df9f5f073dc050978d14fd3b9e613e233981c1856b7
   block number    3
   from    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
   to    Will.setInheritance(address,uint256) 0xd9145CCE52D386f254917e481eB44e9943F39138
   gas    104660 gas
   transaction cost    91008 gas 
   execution cost    69364 gas 
   input    0x88d...40000
   decoded input    {
       "address wallet": "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
       "uint256 amount": "25000000000000000000"
   }
   ```

10. By now, nothing have changed in the family member's wallet address's amount, because the grandfather is not yet deceased. Let's say that, the sad day comes and the grandfather has passed away. To do so, we need to hit the **isDeceased** button. 
    
    ```shell
    status    0x1 Transaction mined and execution succeed
    transaction hash    0x7b1888ba4a776d5d9fca3ef5aceeb2b9a0a65c2649af270d819374c167ce764f
    block hash    0x8ac7069cee6683dee793389253b930b28de17e07fad2a5b5753db2e13f876d11
    block number    16
    from    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    to    Will.isDeceased() 0x0fC5025C764cE34df352757e82f7B5c4Df39A836
    gas    88104 gas
    transaction cost    76612 gas 
    execution cost    55548 gas 
    input    0x85a...c4515
    decoded input    {}
    decoded output    {}
    logs    []
    ```

11. By now, you will see, that the family account holders have increased some balance in their accounts:
    
    ![](../Resources/Smart%20Contracts/Accounts-List2.JPG)

This was an example of creating a smart contract on Remix IDE and using its inbuild wallet to do the deployment and transactions. We can also use Metamask and use our wallet to do the transactions.



Let's take one more example to understand ERC20 Token

## How To Create an ERC20 Token?

Navigate to [remix.ethereum.org](https://remix.ethereum.org/), open the contacts folder, and create a new file with your token name .sol. In my case, I'm taking ZToken.sol.
As we did earlier, Whenever a new Solidity file is created, it’s mandatory to add the [License-identifier and the pragma](https://docs.soliditylang.org/en/develop/layout-of-source-files.html) to **specify the Solidity version** the compiler should use to build our code.

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
```

Now we need to import the ERC20 token contract from [OpenZeppelin](https://openzeppelin.com/), but first, let us understand:

### What is an ERC20?

“An ERC20 token contract keeps track of [*fungible* tokens](https://docs.openzeppelin.com/contracts/4.x/tokens#different-kinds-of-tokens): any token is exactly equal to any other token; no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like a **medium of exchange currency**, **voting rights**, **staking**, and more.”

Simply put ERC20 is nothing more than a class, with its methods and members, that runs the logic of what we commonly call cryptocurrencies, with a broader meaning though, as it also finds applications in other use cases.

[OpenZeppelin](https://openzeppelin.com/) on the other hand is considered the standard library maintaining ERC contracts classes.

If you want to read more about the ERC20 token standard, here’s a couple of resources:

- [What Is ERC-20 and What Does It Mean for Ethereum?](https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/)
- [ERC20 tokens – Simply Explained](https://www.youtube.com/watch?v=cqZhNzZoMh8)

Complete solidty code:

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZToken is ERC20{
    constructor() ERC20("ZToken", "ZTK"){
        _mint(msg.sender,1000*10**18);
    }
}
```

**Inheriting from the ERC20 contract**, gives us access to the [_mint()](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-_mint-address-uint256-) method used to create new tokens and send them to a given address, exactly what we need now.

Minting is defined as **the process of validating information**, creating a new block, and recording that information into the blockchain. Simply put, “mint” means: creating something, like a number of Tokens, or an NFT, and saving it on the blockchain.

- **to:** address of the wallet/contract that will receive the tokens,
- **amount:** amount of tokens to send.

The **“to”** argument, is taken from [msg.sender](https://stackoverflow.com/questions/48562483/solidity-basics-what-msg-sender-stands-for), a special variable whose value is the address of the wallet/contract calling the contract. The **amount**, on the other hand, needs to take care of the decimals, and that’s why we’re passing such a big number, let me go through it for a second.



## Deploy Your ERC20 Token Cryptocurrency

First, let's compile our token

![](../Resources/Smart%20Contracts/ERC20-Compile.gif)

This will compile the ZToken.sol code, populating the **artifacts folder** with our Token’s Contract [abi (application binary interface)](https://docs.soliditylang.org/en/v0.5.3/abi-spec.html) and their binary version, used to deploy it on the blockchain.



Now that we have our artifacts, click on the Ethereum logo under the Solidity icon, select your contract in the dropdown menu, and click on deploy:

![](../Resources/Smart%20Contracts/ERC20-Deploy.gif)

## Interaction with our token

Remember? When deployed, our smart contract should have issued 1000 tokens to our wallet! If you watch, right above the Deploy button, there’s the “account” field:

![](../Resources/Smart%20Contracts/ERC20-Details.JPG)

That’s the **address of the wallet we used to deploy our ERC20 Token contract**, we can say that because some Ethereum is missing, the Gas fees we paid to deploy the contract on the Ethereum Virtual Machine.

Under deployed section, you will see all ERC20 methods, that your contract inherited or implemented:

![](../Resources/Smart%20Contracts/ZToken-Details.JPG)

The color of the buttons represents whether the representing function modifies any value on the blockchain, costing Gas (**Orange**), or it’s a simple view function just reading and returning a value (**Blue**).



To test the operations, let's take some account addresses:

![](../Resources/Smart%20Contracts/ZToken-Addresses.JPG)

- Contract Owner: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

- User 1: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

- User 2: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

First, let's see the balance the owner is holding. Copy the owner account (using which, you deployed the contract). Select balanceOf dropdown and put the address in the address input. Then press the call button:

![](../Resources/Smart%20Contracts/ZToken-Owner1-balance1.JPG)

You can see the owner has all the minted tokens.

Now, let's transfer some tokens to User 1 and User 2. To do that, select the user from the account drop-down and copy the address.
Don't forget to reselect the original owner from the account dropdown, because only the owner has the access to execute the contract and do the necessary operations.

Open transfer dropdown form deployed contract functions and put user 1 address with an amount to be transferred.

![](../Resources/Smart%20Contracts/ZToken-Transfer-User1.JPG)

Similarly, transfer some amount to user 2:

![](../Resources/Smart%20Contracts/ZToken-Transfer-User2.JPG)

Congratulations! 🎉 You have successfully transfered your newly created tokens.



To check the balance, you can use the balanceOf functions with the respective user's address.

Owner

![](../Resources/Smart%20Contracts/ZToken-Owner1-balance2.JPG)

User 1

![](../Resources/Smart%20Contracts/ZToken-User1-balance.JPG)

User 2

![](../Resources/Smart%20Contracts/ZToken-User2-balance.JPG)
