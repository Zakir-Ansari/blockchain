import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCampaignsComponent } from './user-campaigns.component';

describe('UserCampaignsComponent', () => {
  let component: UserCampaignsComponent;
  let fixture: ComponentFixture<UserCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
