import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { Campaign } from '../../../models/campaign.model';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { ToEthPipe } from '../../../pipes/to-eth.pipe';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, ToEthPipe],
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;
  @Input() campaignIndex!: number;
  @Input() displayStatusBadge = false;
  @Output() onCampaignSelected: EventEmitter<Campaign> = new EventEmitter<Campaign>();

  clipboard = inject(Clipboard);

  copiedAddressAtIndex = -1;

  copyAddress(value: string, index: number) {
    this.clipboard.copy(value);
    this.copiedAddressAtIndex = index;
    setTimeout(() => (this.copiedAddressAtIndex = -1), 2000);
  }

  selectCampaign() {
    this.onCampaignSelected.emit(this.campaign);
  }
}
