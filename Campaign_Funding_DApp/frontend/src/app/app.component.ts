import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CampaignService } from './services/campaign/campaign.service';
import { MetaMaskService } from './services/metamask/meta-mask.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TruncatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  campaignService = inject(CampaignService);
  metaMaskService = inject(MetaMaskService);

  walletAddress: string | null = null;
  walletBalance: string | null = null;

  ngOnInit(): void {
    console.log('ENV:', environment.env);
    this.metaMaskService.account$.subscribe(account => {
      this.walletAddress = account;
    });

    this.metaMaskService.balance$.subscribe(balance => {
      this.walletBalance = Number(balance).toFixed(3);
    });
  }

  async connectWallet() {
    await this.metaMaskService.connectWallet();
  }

  get isLoggedIn(): boolean {
    return this.metaMaskService.isLoggedIn;
  }
}
