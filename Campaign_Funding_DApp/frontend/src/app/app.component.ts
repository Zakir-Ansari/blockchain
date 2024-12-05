import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CampaignService } from './services/campaign/campaign.service';
import { MetaMaskService } from './services/metamask/meta-mask.service';

declare const bootstrap: any; // Required to use Bootstrap JS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  async connectWallet() {
    await this.metaMaskService.connectWallet();
  }

  get isLoggedIn(): boolean {
    return this.metaMaskService.isLoggedIn;
  }
}
