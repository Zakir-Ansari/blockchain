import { Component, inject, OnInit } from '@angular/core';
import { States } from '../../constants/common.constant';
import { Campaign, DonatorDonations } from '../../models/campaign.model';
import { ToastService } from '../../services/shared/toast/toast.service';
import { CampaignService } from '../../services/campaign/campaign.service';
import { UtilService } from '../../services/shared/util/util.service';
import { from, map } from 'rxjs';
import { MetaMaskService } from '../../services/metamask/meta-mask.service';
import { CampaignCardComponent } from '../helpers/campaign-card/campaign-card.component';
import { CampaignDetailsComponent } from '../helpers/campaign-details/campaign-details.component';
import { FormsModule } from '@angular/forms';
import { CampaignFilterPipe } from '../../pipes/campaign-filter.pipe';

@Component({
  selector: 'app-user-campaigns',
  standalone: true,
  imports: [CampaignCardComponent, CampaignDetailsComponent, FormsModule, CampaignFilterPipe],
  templateUrl: './user-campaigns.component.html',
  styleUrl: './user-campaigns.component.scss',
})
export class UserCampaignsComponent implements OnInit {
  // services
  toastService = inject(ToastService);
  campaignService = inject(CampaignService);
  util = inject(UtilService);
  metaMaskService = inject(MetaMaskService);

  campaignList: Campaign[] = [];
  selectedCampaign: Campaign | undefined;
  walletAddress: string | null = null;

  STATES = States;
  campaignsDataState!: States;
  searchKey = '';

  ngOnInit(): void {
    this.metaMaskService.account$.subscribe(account => {
      this.walletAddress = account;
    });

    this.selectedCampaign = undefined;
    this.campaignsDataState = States.LOADING;

    from(this.campaignService.getCampaigns())
      .pipe(
        // filter campaigns, that are not deleted and whose target donation is not completed
        map(data =>
          data.filter(
            campaign => campaign.owner.toUpperCase() === this.walletAddress?.toUpperCase() && !campaign.isDeleted
          )
        ),
        // format the deadline
        map(res =>
          res.map(campaign => {
            campaign.deadline = this.util.calculateDaysLeft(campaign.deadline);
            return campaign;
          })
        ),
        // re-map the donatorDonations array with sum of donations for each donators
        map(res =>
          res.map(campaign => {
            campaign.donatorDonations = campaign.donatorDonations?.reduce((acc, curr) => {
              const currentDonator = acc.find(a => a.donator == curr.donator);
              if (currentDonator) currentDonator.donation += curr.donation;
              else acc.push(curr);
              return acc;
            }, [] as DonatorDonations[]);
            return campaign;
          })
        )
      )
      .subscribe({
        next: response => {
          this.campaignList = response;
          this.campaignsDataState = States.LOADED;
        },
        error: () => {
          this.campaignsDataState = States.FAILED;
        },
      });
  }

  displayCampaignDetails(campaign: Campaign) {
    this.selectedCampaign = campaign;
    window.scroll({ top: 0 });
  }
}
