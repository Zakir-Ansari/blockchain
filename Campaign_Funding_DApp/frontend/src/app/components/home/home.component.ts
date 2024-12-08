import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { States } from '../../constants/common.constant';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign/campaign.service';
import { ToastService } from '../../services/shared/toast/toast.service';
import { UtilService } from '../../services/shared/util/util.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // services
  toastService = inject(ToastService);
  campaignService = inject(CampaignService);
  util = inject(UtilService);
  clipboard = inject(Clipboard);

  // variables
  campaignForm!: FormGroup;
  campaignList: Campaign[] = [];

  // helper
  isCampaignFormSubmitted = false;
  STATES = States;
  campaignsDataState!: States;
  campaignCreationState!: States;
  currentDate = new Date().toISOString().slice(0, 10);
  copiedAddressAtIndex = -1;

  ngOnInit(): void {
    this.campaignsDataState = States.LOADING;
    this.campaignForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      target: new FormControl('', [Validators.required, Validators.min(1)]),
      deadline: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });

    this.campaignService
      .getCampaigns()
      .then((response) => {
        response.map((res) => {
          res.deadline = this.util.calculateDaysLeft(res.deadline);
          return res;
        });
        this.campaignList = response;
        this.campaignsDataState = States.LOADED;
      })
      .catch(() => {
        this.campaignsDataState = States.FAILED;
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
      .then((response) => {
        this.campaignCreationState = States.LOADED;
        this.toastService.showToast(
          'Success',
          'Campaign created!',
          'check',
          5000,
          'top-0 start-50 translate-middle-x',
          {
            bxIconName: 'bx-link',
            callback: () => console.log('Icon clicked'),
          }
        );
        this.resetCampaignForm();
      })
      .catch((error) => {
        this.campaignCreationState = States.FAILED;
        throw new Error(error?.message || 'Unknown Error');
      });
  }

  resetCampaignForm() {
    this.campaignForm.reset();
    this.isCampaignFormSubmitted = false;
  }

  copyAddress(value: string, index: number) {
    this.clipboard.copy(value);
    this.copiedAddressAtIndex = index;
    setTimeout(() => (this.copiedAddressAtIndex = -1), 2000);
  }
}
