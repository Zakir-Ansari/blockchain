import { AfterViewInit, Component, Input } from '@angular/core';
import { Campaign } from '../../../models/campaign.model';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss',
})
export class CampaignDetailsComponent implements AfterViewInit {
  @Input() campaign!: Campaign;
  ngAfterViewInit(): void {
    console.log('Selected Campaign:', this.campaign);
  }
}
