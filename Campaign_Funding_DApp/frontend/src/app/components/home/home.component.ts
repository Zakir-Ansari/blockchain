import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { States } from '../../constants/common.constant';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign/campaign.service';
import { ToastService } from '../../services/shared/toast/toast.service';
import { UtilService } from '../../services/shared/util/util.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  // helper
  isCampaignFormSubmitted = false;
  STATES = States;
  campaignsDataState!: States;
  currentDate = new Date().toISOString().slice(0, 10);

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
    this.campaignService
      .createCampaign(
        this.campaignForm.value.title,
        this.campaignForm.value.description,
        this.campaignForm.value.target,
        1738234141971,
        this.campaignForm.value.image
      )
      .then((response) => {
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
      });
  }

  resetCampaignForm() {
    this.campaignForm.reset();
    this.isCampaignFormSubmitted = false;
  }
}
