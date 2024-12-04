import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CampaignViewComponent } from './components/campaign-view/campaign-view.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'campaign', component: CampaignViewComponent },
];
