import { Pipe, PipeTransform } from '@angular/core';
import { Campaign } from '../models/campaign.model';

@Pipe({
  name: 'campaignFilter',
  standalone: true,
})
export class CampaignFilterPipe implements PipeTransform {
  transform(campaigns: Campaign[], searchTerm: string): Campaign[] {
    return campaigns.filter(
      campaign =>
        campaign.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 ||
        campaign.owner.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1
    );
  }
}
