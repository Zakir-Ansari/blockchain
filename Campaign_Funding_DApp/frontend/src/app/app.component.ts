import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignService } from './services/campaign/campaign.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  campaignService = inject(CampaignService);
  title = 'campaign-funding-app';
  campaigns: any[] = [];
  test: any;

  ngOnInit(): void {}
}
