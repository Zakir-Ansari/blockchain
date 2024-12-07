import { inject, Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  toastService = inject(ToastService);
  private provider: any = null;
  private signer: ethers.Signer | null = null;

  private accountSubject = new BehaviorSubject<string | null>(null);
  private balanceSubject = new BehaviorSubject<string | null>(null);

  account$ = this.accountSubject.asObservable();
  balance$ = this.balanceSubject.asObservable();

  private balancePollingInterval: any = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.checkWalletConnection();
      this.setupEventListeners();
    } else {
      console.error('MetaMask provider not found');
    }
  }

  async connectWallet(): Promise<void> {
    if (!this.provider) {
      this.toastService.showToast(
        'Error!',
        'Metamask is not installed. Please install it first.',
        'error',
        5000,
        'top-0 start-50 translate-middle-x'
      );
      return;
    }
    try {
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        await this.setAccount(accounts[0]);
      }
    } catch (error: any) {
      console.error(error);
      this.toastService.showToast(
        'Error!',
        `Failed to connect wallet. ${error?.message}`,
        'error',
        5000,
        'top-0 start-50 translate-middle-x'
      );
    }
  }

  private async checkWalletConnection() {
    if (this.provider && (await this.provider._metamask.isUnlocked())) {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.setAccount(accounts[0]);
      }
    }
  }

  private setupEventListeners() {
    this.provider.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length > 0) {
        await this.setAccount(accounts[0]);
      } else {
        this.setAccount(null);
      }
    });

    this.provider.on('chainChanged', () => {
      window.location.reload();
    });
  }

  private async setAccount(account: string | null) {
    this.accountSubject.next(account);
    if (account) {
      await this.fetchBalance(account);
      // Start polling for balance updates
      this.startBalancePolling(account);
    } else {
      this.balanceSubject.next(null);
      // Stop polling if no account is connected
      this.stopBalancePolling();
    }
  }

  private async fetchBalance(account: string) {
    if (this.provider) {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const balance = await ethersProvider.getBalance(account);
      const formattedBalance = ethers.formatEther(balance); // Convert balance to Ether format
      this.balanceSubject.next(formattedBalance);
    }
  }

  private startBalancePolling(account: string) {
    if (this.balancePollingInterval) {
      clearInterval(this.balancePollingInterval);
    }

    // Poll the balance every 10 seconds
    this.balancePollingInterval = setInterval(async () => {
      await this.fetchBalance(account);
    }, 10000);
  }

  private stopBalancePolling() {
    if (this.balancePollingInterval) {
      clearInterval(this.balancePollingInterval);
      this.balancePollingInterval = null;
    }
  }

  get isLoggedIn(): boolean {
    return !!this.accountSubject.value;
  }

  get walletAddress(): string | null {
    return this.accountSubject.value;
  }
}
