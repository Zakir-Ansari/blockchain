import { Injectable } from '@angular/core';
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';
import { createWallet } from 'thirdweb/wallets';

@Injectable({
  providedIn: 'root',
})
export class ThirdwebService {
  private client = createThirdwebClient({
    clientId: 'YOUR_CLIENT_ID',
  });

  private wallet = createWallet('io.metamask');

  private contract = getContract({
    client: this.client,
    chain: defineChain(17000),
    address: 'CONTRACT_ADDRESS',
  });

  connectWallet() {
    return this.wallet.connect({ client: this.client });
  }

  getContract() {
    return this.contract;
  }
}
