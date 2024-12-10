import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Campaign } from '../../../models/campaign.model';
import { ethers } from 'ethers';
import { ToEthPipe } from '../../../pipes/to-eth.pipe';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [ToEthPipe],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss',
})
export class CampaignDetailsComponent implements OnInit, AfterViewInit {
  @Input() campaign!: Campaign;
  percentOfDonation = '0%';

  ngOnInit(): void {
    this.percentOfDonation = `${(
      (this.campaign.totalDonation / Math.pow(10, 18) / this.campaign.target) *
      100
    ).toFixed(0)}%`;
  }

  ngAfterViewInit(): void {
    console.log('Selected Campaign:', this.campaign);
  }
}
