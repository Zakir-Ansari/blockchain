import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { States } from '../../../constants/common.constant';
import { Campaign, DonatorDonations } from '../../../models/campaign.model';
import { ToEthPipe } from '../../../pipes/to-eth.pipe';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { ToastService } from '../../../services/shared/toast/toast.service';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToEthPipe, AgGridAngular, TruncatePipe],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss',
})
export class CampaignDetailsComponent implements OnInit {
  @Input() campaign!: Campaign;
  @Input() deletable = false;
  @Output() refreshParent = new EventEmitter<boolean>();
  toastService = inject(ToastService);
  campaignService = inject(CampaignService);
  percentOfDonation = '0%';
  donationForm!: FormGroup;
  gridApi!: GridApi<DonatorDonations>;

  isDonationSubmitted = false;
  STATES = States;
  donationProcessState!: States;

  // Ag grid - Row Data: The data to be displayed.
  rowData: DonatorDonations[] = [];
  // Ag grid - Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'donator', flex: 2 },
    {
      field: 'donation',
      cellClass: 'ag-right-aligned-cell',
      headerClass: 'ag-right-aligned-header',
      valueFormatter: params => new ToEthPipe().transform(params.data.donation),
    },
  ];
  // Ag grid - Default Column Definition
  defaultColDef = {
    flex: 1,
    minWidth: 120,
    wrapHeaderText: true,
    filter: true,
    floatingFilter: true,
  };

  ngOnInit(): void {
    this.donationForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.percentOfDonation = `${((this.campaign.totalDonation / this.campaign.target) * 100).toFixed(0)}%`;
    this.rowData = this.campaign.donatorDonations ?? [];
  }

  get f() {
    return this.donationForm.controls;
  }

  onGridReady(params: GridReadyEvent<DonatorDonations>) {
    this.gridApi = params.api;
    //this.gridApi.setGridOption('domLayout', 'autoHeight');
  }

  donate() {
    this.donationProcessState = States.LOADING;
    this.isDonationSubmitted = true;
    if (!this.donationForm.valid) {
      this.donationProcessState = States.LOADED;
      return;
    }

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
