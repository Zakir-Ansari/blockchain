# Solidity & Smart Contracts

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

[**MetaMask**](https://moralis.io/metamask-explained-what-is-metamask/?utm_source=blog&utm_medium=post&utm_campaign=Remix%2520Explained%2520%25E2%2580%2593%2520What%2520is%2520Remix%253F) is one of the most popular wallets for storing coins and tokens (aka cryptocurrencies). The great thing about MetaMask is that it also serves as a gateway to access Web3 applications. You can also use MetaMask for authentication



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
   
   - Environment - We can select any env as per our need
   
   - Accounts - Test ether accounts to run our contracts upon.
   
   - Gas Limit - Show the available gas fee amounts for your contracts.
   
   - Value - the amount of ether that the currently selected account is going to allocate into our smart contract. And eventually, it will become the **owner** of the contract. The value is in **wei**, which is smallest unit of ether.
     
     Put 30 as value and ether as a unit for our contract.

7. Now, everything is ready. Go ahead and hit Deploy.
   
   ![](../Resources/Smart%20Contracts/Deployed1.JPG)
   
   Console output:
   
   ```bash
   status	0x1 Transaction mined and execution succeed
   transaction hash	0x487554139cecaf6c2a9367a8a869316bee8f8014c3ca1d11052cd199797d6271
   block hash	0x4b70c177458195ac939e25d8888d88ca75486cfd979a344afce04305f662ace5
   block number	1
   contract address	0xd9145CCE52D386f254917e481eB44e9943F39138
   from	0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
   to	Will.(constructor)
   gas	384839 gas
   transaction cost	334718 gas 
   execution cost	263174 gas 
   input	0x608...80033
   decoded input	{}
   decoded output	 - 
   logs	[]
   value	30000000000000000000 wei
   ```
   
   - Amount of 30 ether has been deducted from the current owner's account
   
   - Under deployed contracts - you will see the function we defined in our contract

8. Now, that our contract has been deployed, How do we actually interact with our contract? Let's check.
   
   Under the deployed contract, we have 2 interactive buttons
   
   ![](../Resources/Smart%20Contracts/Deployed-Contract-Buttons.JPG)
   
   This provides us with everything we need to run this smart contract. So, let's go ahead and test this smart contract.

9. First, set the inheritance, by putting wallet addresses and amounts. You can get the list of accounts from the accounts dropdown:
   
   ![](../Resources/Smart%20Contracts/Accounts-List.JPG)
   
   Just select the account and copy the address. Then use it under setInheritance options:
   
   ![](../Resources/Smart%20Contracts/setInheritance.JPG)
   
   **Note**: the amount is in Wei, so we have to add those extra zeros to make it an ether unit.
   
   Once, hit the transact button. and it will add the account as the family member of the owner. Similarly, add another account as a family member with their wallet address and some amount. Let's say, member 1 is getting 25 ethers and member 2 is getting 5 ethers.
   
   **Remember**: While deploying the contract, the owner had given 30 ether. So, he can only set the inheritance amount sum, up to 30 ether only. If you try to execute the transaction, with more than 30 ether, the contract will throw an error:
   
   
   
   Console output of the transaction.
   
   ```shell
   status	0x1 Transaction mined and execution succeed
   transaction hash	0x7ca2a27d43548584da028a21e0e6b0232fb39e1099bfc4b8b3884ed6ee5e58ee
   block hash	0xd192a29f9d8b8875560b2df9f5f073dc050978d14fd3b9e613e233981c1856b7
   block number	3
   from	0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
   to	Will.setInheritance(address,uint256) 0xd9145CCE52D386f254917e481eB44e9943F39138
   gas	104660 gas
   transaction cost	91008 gas 
   execution cost	69364 gas 
   input	0x88d...40000
   decoded input	{
   	"address wallet": "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
   	"uint256 amount": "25000000000000000000"
   }
   ```

10. By now, nothing have changed in the family member's wallet address's amount, because the grandfather is not yet deceased. Let's say that, the sad day comes and the grandfather has passed away. To do so, we need to hit the **isDeceased** button. 
    
    ```shell
    status	0x1 Transaction mined and execution succeed
    transaction hash	0x7b1888ba4a776d5d9fca3ef5aceeb2b9a0a65c2649af270d819374c167ce764f
    block hash	0x8ac7069cee6683dee793389253b930b28de17e07fad2a5b5753db2e13f876d11
    block number	16
    from	0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    to	Will.isDeceased() 0x0fC5025C764cE34df352757e82f7B5c4Df39A836
    gas	88104 gas
    transaction cost	76612 gas 
    execution cost	55548 gas 
    input	0x85a...c4515
    decoded input	{}
    decoded output	{}
    logs	[]
    ```

11. By now, you will see, that the family account holders have increased some balance in their accounts:
    
    ![](../Resources/Smart%20Contracts/Accounts-List2.JPG)



This was an example of creating a smart contract on Remix IDE and using it's inbuild wallet to do the deployment and transactions. Further, we will see how to use Metamask and use our own wallet to do the transations.
