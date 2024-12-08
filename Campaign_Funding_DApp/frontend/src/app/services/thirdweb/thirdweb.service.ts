import { Injectable } from '@angular/core';
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';
import { createWallet } from 'thirdweb/wallets';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThirdwebService {
  private client = createThirdwebClient({
    clientId: environment.thirdwebClientId,
  });

  private wallet = createWallet('io.metamask');

  private contract = getContract({
    client: this.client,
    chain: defineChain(17000),
    address: environment.contractAddress,
  });

  connectWallet() {
    return this.wallet.connect({ client: this.client });
  }

  getContract() {
    return this.contract;
  }
}
