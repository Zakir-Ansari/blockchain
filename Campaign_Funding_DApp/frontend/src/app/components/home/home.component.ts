import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  // variables
  campaignForm!: FormGroup;

  // helper
  isCampaignFormSubmitted = false;

  ngOnInit(): void {
    this.campaignForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
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
    console.log('Form Submitted', this.campaignForm.value);
    this.resetCampaignForm();
  }

  resetCampaignForm() {
    this.campaignForm.reset();
    this.isCampaignFormSubmitted = false;
  }
}
