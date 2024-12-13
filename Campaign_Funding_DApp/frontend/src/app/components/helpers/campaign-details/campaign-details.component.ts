import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '../../../models/campaign.model';
import { ethers } from 'ethers';
import { ToEthPipe } from '../../../pipes/to-eth.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { ToastService } from '../../../services/shared/toast/toast.service';
import { States } from '../../../constants/common.constant';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToEthPipe],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss',
})
export class CampaignDetailsComponent implements OnInit, AfterViewInit {
  @Input() campaign!: Campaign;
  @Output() refreshParent = new EventEmitter<boolean>();
  toastService = inject(ToastService);
  campaignService = inject(CampaignService);
  percentOfDonation = '0%';
  donationForm!: FormGroup;

  isDonationSubmitted = false;
  STATES = States;
  donationProcessState!: States;

  ngOnInit(): void {
    this.percentOfDonation = `${((this.campaign.totalDonation / Math.pow(10, 18) / this.campaign.target) * 100).toFixed(
      0
    )}%`;

    this.donationForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngAfterViewInit(): void {
    console.log('Selected Campaign:', this.campaign);
  }

  get f() {
    return this.donationForm.controls;
  }

  donate() {
    this.donationProcessState = States.LOADING;
    this.isDonationSubmitted = true;
    if (!this.donationForm.valid) {
      this.donationProcessState = States.LOADED;
      return;
    }

    console.log(this.donationForm.value);
    const amountInEth = BigInt(this.donationForm.value.amount * Math.pow(10, 18));
    this.campaignService
      .donateToCampaign(this.campaign.id, amountInEth)
      .then(result => {
        const txLink = `<br><a href="https://holesky.beaconcha.in/tx/${result.transactionHash}" target="_blank">View Transaction</a>`;
        this.toastService.showToast(
          'Donation Successful',
          `Thank you for the donation!${txLink}`,
          'check',
          5000,
          'top-0 start-50 translate-middle-x'
        );
        this.resetAll();
      })
      .catch(error => {
        this.donationProcessState = States.FAILED;
        throw new Error(error?.message || 'Unknown Error');
      });
  }

  resetAll() {
    this.donationForm.reset();
    this.donationProcessState = States.LOADED;
    this.requestParentComponentToRefresh();
  }

  requestParentComponentToRefresh() {
    this.refreshParent.emit(true);
  }
}
