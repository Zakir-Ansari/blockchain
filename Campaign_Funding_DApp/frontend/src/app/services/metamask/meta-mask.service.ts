import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  private provider: any = null;
  private signer: ethers.Signer | null = null;

  private accountSubject = new BehaviorSubject<string | null>(null);
  private balanceSubject = new BehaviorSubject<string | null>(null);

  account$ = this.accountSubject.asObservable();
  balance$ = this.balanceSubject.asObservable();

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
      alert('MetaMask is not installed. Please install it and try again.');
      return;
    }
    try {
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        await this.setAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
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
    } else {
      this.balanceSubject.next(null);
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

  get isLoggedIn(): boolean {
    return !!this.accountSubject.value;
  }

  get walletAddress(): string | null {
    return this.accountSubject.value;
  }
}
