import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignService } from './services/campaign/campaign.service';
import { MetaMaskService } from './services/metamask/meta-mask.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  campaignService = inject(CampaignService);
  metaMaskService = inject(MetaMaskService);
  title = 'campaign-funding-app';

  walletAddress: string | null = null;
  walletBalance: string | null = null;

  ngOnInit(): void {
    this.metaMaskService.account$.subscribe((account) => {
      this.walletAddress = account;
    });

    this.metaMaskService.balance$.subscribe((balance) => {
      this.walletBalance = Number(balance).toFixed(6);
    });
  }

  async connectWallet() {
    await this.metaMaskService.connectWallet();
  }

  get isLoggedIn(): boolean {
    return this.metaMaskService.isLoggedIn;
  }
}
