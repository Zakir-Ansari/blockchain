import { Injectable } from '@angular/core';
import { ThirdwebService } from '../thirdweb/thirdweb.service';
import { prepareContractCall, readContract, sendTransaction } from 'thirdweb';
import { Campaign } from '../../models/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private thirdweb: ThirdwebService) {}

  async getCampaigns() {
    const contract = this.thirdweb.getContract();
    return readContract({
      contract,
      method:
        'function getCampaigns() view returns ((uint256 id, address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations, bool isDeleted)[])',
      params: [],
    }).then((data) => {
      return data.map(
        (campaign) =>
          ({
            id: Number(campaign.id),
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            // converting target date from epoch to local
            target: Number(campaign.target),
            deadline: Number(campaign.deadline) * 1000,
            amountCollected: Number(campaign.amountCollected),
            image: campaign.image,
            donators: campaign.donators,
            donations: campaign.donations.map(Number),
            isDeleted: campaign.isDeleted,
          } as Campaign)
      );
    });
  }

  async createCampaign(
    owner: string,
    title: string,
    description: string,
    target: number,
    deadline: number,
    image: string
  ) {
    const contract = this.thirdweb.getContract();
    const transaction = prepareContractCall({
      contract,
      method:
        'function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)',
      params: [
        owner,
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
  }

  async donateToCampaign(campaignId: number, amount: number) {
    const contract = this.thirdweb.getContract();
    const transaction = prepareContractCall({
      contract,
      method: 'function donateToCampaign(uint256 _id) payable',
      params: [BigInt(campaignId)],
      value: BigInt(amount),
    });

    const account = await this.thirdweb.connectWallet();
    return sendTransaction({
      transaction,
      account,
    });
  }
}
