import { inject, Injectable } from '@angular/core';
import { ThirdwebService } from '../thirdweb/thirdweb.service';
import { prepareContractCall, readContract, sendTransaction } from 'thirdweb';
import { Campaign, DonatorDonations } from '../../models/campaign.model';
import { MetaMaskService } from '../metamask/meta-mask.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  metaMaskService = inject(MetaMaskService);
  walletAddress: string | null = null;

  constructor(private thirdweb: ThirdwebService) {
    this.metaMaskService.account$.subscribe(account => {
      this.walletAddress = account;
    });
  }

  /**
   * This TypeScript function retrieves campaign data from a smart contract and processes it for
   * display.
   * @returns The `getCampaigns` function is returning a Promise that resolves to an array of Campaign
   * objects. Each Campaign object contains properties such as id, owner, title, description, target,
   * deadline, amountCollected, image, totalDonation, isDeleted, and donatorDonations. The data is
   * fetched from a smart contract and processed before being returned.
   */
  async getCampaigns() {
    try {
      const contract = this.thirdweb.getContract();
      return readContract({
        contract,
        method:
          'function getCampaigns() view returns ((uint256 id, address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations, bool isDeleted)[])',
        params: [],
      }).then(data => {
        return data.map(
          campaign =>
            ({
              id: Number(campaign.id),
              owner: campaign.owner,
              title: campaign.title,
              description: campaign.description,
              // converting target date from epoch to local
              target: Number(campaign.target) * Math.pow(10, 18),
              deadline: Number(campaign.deadline) * 1000,
              amountCollected: Number(campaign.amountCollected),
              image: campaign.image,
              totalDonation: campaign.donations.map(Number).reduce((sum, curr) => sum + curr, 0),
              isDeleted: campaign.isDeleted,
              donatorDonations: campaign.donators.map((donator, index) => {
                const result: DonatorDonations = {
                  donator: donator,
                  donation: campaign.donations.map(Number)[index],
                };
                return result;
              }),
            } as Campaign)
        );
      });
    } catch (error) {
      throw new Error('Failed to fetch campaigns.');
    }
  }

  /**
   * This TypeScript function creates a campaign by interacting with a smart contract, handling errors
   * and converting timestamps as needed.
   * @param {string} title - The `title` parameter is a string that represents the title of the
   * campaign you want to create.
   * @param {string} description - The `description` parameter in the `createCampaign` function is a
   * string that represents the description or details of the campaign being created. It provides
   * information about the purpose, goals, or any other relevant details of the campaign.
   * @param {number} target - The `target` parameter in the `createCampaign` function represents the
   * fundraising goal or target amount that the campaign aims to reach. It is a number that specifies
   * the amount of funds that the campaign creator is trying to raise from supporters or donors.
   * @param {number} deadline - The `deadline` parameter in the `createCampaign` function represents
   * the timestamp in milliseconds indicating the deadline for the campaign. It is converted to epoch
   * time (seconds since January 1, 1970) by dividing it by 1000 before being passed to the smart
   * contract function.
   * @param {string} image - The `image` parameter in the `createCampaign` function is a string that
   * represents the image associated with the campaign. This could be a URL pointing to an image file
   * or any other form of image data that can be used to visually represent the campaign.
   * @returns The `createCampaign` function is returning a promise that resolves to the result of
   * sending a transaction to create a campaign on the blockchain.
   */
  async createCampaign(title: string, description: string, target: number, deadline: number, image: string) {
    if (!this.walletAddress) {
      throw new Error('Wallet is not connected! Please connect Metamask wallet first.');
    }
    try {
      const contract = this.thirdweb.getContract();
      const transaction = prepareContractCall({
        contract,
        method:
          'function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)',
        params: [
          this.walletAddress,
          title,
          description,
          BigInt(target),
          BigInt(Math.floor(deadline / 1000)), // converting local timestamp to epoch time
          image,
        ],
      });

      const account = await this.thirdweb.connectWallet();
      return sendTransaction({
        transaction,
        account,
      });
    } catch (error) {
      throw new Error('Failed to create campaign');
    }
  }

  /**
   * The function `donateToCampaign` asynchronously donates a specified amount to a campaign using a
   * smart contract, handling wallet connection and transaction execution.
   * @param {number} campaignId - The `campaignId` parameter is the unique identifier of the campaign
   * to which the donation will be made. It is of type `number`.
   * @param {bigint} amount - The `amount` parameter in the `donateToCampaign` function represents the
   * donation amount that the user wants to contribute to a specific campaign. It is of type `bigint`,
   * which is a numeric data type in JavaScript that can represent integers of arbitrary length.
   * @returns The `donateToCampaign` function is returning a promise that resolves to the result of
   * sending a transaction to donate to a campaign.
   */
  async donateToCampaign(campaignId: number, amount: bigint) {
    if (!this.walletAddress) {
      throw new Error('Wallet is not connected! Please connect Metamask wallet first.');
    }
    try {
      const contract = this.thirdweb.getContract();
      const transaction = prepareContractCall({
        contract,
        method: 'function donateToCampaign(uint256 _id) payable',
        params: [BigInt(campaignId)],
        value: amount,
      });

      const account = await this.thirdweb.connectWallet();
      return sendTransaction({
        transaction,
        account,
      });
    } catch (error) {
      throw new Error('Donation to campaign failed.');
    }
  }

  /**
   * The function `deleteCampaign` deletes a campaign by calling a contract method after checking for a
   * connected wallet and handling errors.
   * @param {number} campaignId - The `campaignId` parameter is a number that represents the unique
   * identifier of the campaign that you want to delete.
   * @returns The `deleteCampaign` function is returning the result of the `sendTransaction` function,
   * which is likely a promise that resolves to the transaction hash of the delete campaign
   * transaction.
   */
  async deleteCampaign(campaignId: number) {
    if (!this.walletAddress) {
      throw new Error('Wallet is not connected! Please connect Metamask wallet first.');
    }
    try {
      const contract = this.thirdweb.getContract();
      const transaction = await prepareContractCall({
        contract,
        method: 'function deleteCampaign(uint256 _id)',
        params: [BigInt(campaignId)],
      });
      const account = await this.thirdweb.connectWallet();
      return sendTransaction({
        transaction,
        account,
      });
    } catch (error) {
      throw new Error('Failed to delete campaign');
    }
  }
}
