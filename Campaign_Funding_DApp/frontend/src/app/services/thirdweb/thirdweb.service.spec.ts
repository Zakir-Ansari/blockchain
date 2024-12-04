import { TestBed } from '@angular/core/testing';

import { ThirdwebService } from './thirdweb.service';

describe('ThirdwebService', () => {
  let service: ThirdwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
