import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { from, map } from 'rxjs';
import { States } from '../../constants/common.constant';
import { Campaign, DonatorDonations } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign/campaign.service';
import { ToastService } from '../../services/shared/toast/toast.service';
import { UtilService } from '../../services/shared/util/util.service';
import { CampaignCardComponent } from '../helpers/campaign-card/campaign-card.component';
import { CampaignDetailsComponent } from '../helpers/campaign-details/campaign-details.component';
import { CampaignFilterPipe } from '../../pipes/campaign-filter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignDetailsComponent,
    CampaignCardComponent,
    CampaignFilterPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // services
  toastService = inject(ToastService);
  campaignService = inject(CampaignService);
  util = inject(UtilService);

  // variables
  campaignForm!: FormGroup;
  campaignList: Campaign[] = [];
  selectedCampaign: Campaign | undefined;
  searchKey = '';

  // helper
  isCampaignFormSubmitted = false;
  STATES = States;
  campaignsDataState!: States;
  campaignCreationState!: States;
  currentDate = new Date().toISOString().slice(0, 10);

  ngOnInit(): void {
    this.selectedCampaign = undefined;
    this.campaignsDataState = States.LOADING;
    this.campaignForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      target: new FormControl('', [Validators.required, Validators.min(1)]),
      deadline: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });

    from(this.campaignService.getCampaigns())
      .pipe(
        // filter campaigns, that are not deleted and whose target donation is not completed
        map(data => data.filter(campaign => campaign.target > campaign.totalDonation && !campaign.isDeleted)),
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
          // only active campaigns
          this.campaignList = response.filter(res => res.deadline > 0);
          this.campaignsDataState = States.LOADED;
        },
        error: () => {
          this.campaignsDataState = States.FAILED;
        },
      });
  }

  // convenient getter for easy access to form fields
  get f() {
    return this.campaignForm.controls;
  }

  onSubmit() {
    this.isCampaignFormSubmitted = true;
    if (!this.campaignForm.valid) {
      return;
    }
    this.campaignCreationState = States.LOADING;
    this.campaignService
      .createCampaign(
        this.campaignForm.value.title,
        this.campaignForm.value.description,
        this.campaignForm.value.target,
        new Date(this.campaignForm.value.deadline).getTime(),
        this.campaignForm.value.image
      )
      .then(response => {
        this.campaignCreationState = States.LOADED;
        const txLink = `<br><a href="https://holesky.beaconcha.in/tx/${response.transactionHash}" target="_blank">View Transaction</a>`;
        this.toastService.showToast(
          'Success',
          `Campaign created!${txLink}`,
          'check',
          5000,
          'top-0 start-50 translate-middle-x'
        );
        this.resetCampaignForm();
        this.ngOnInit();
      })
      .catch(error => {
        this.campaignCreationState = States.FAILED;
        throw new Error(error?.message || 'Unknown Error');
      });
  }

  resetCampaignForm() {
    this.campaignForm.reset();
    this.isCampaignFormSubmitted = false;
  }

  displayCampaignDetails(campaign: Campaign) {
    this.selectedCampaign = campaign;
    window.scroll({ top: 0 });
  }
}
