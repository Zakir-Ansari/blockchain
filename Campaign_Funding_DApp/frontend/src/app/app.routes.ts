import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserCampaignsComponent } from './components/user-campaigns/user-campaigns.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'my-campaigns', component: UserCampaignsComponent },
];
