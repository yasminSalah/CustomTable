import { TestBed } from '@angular/core/testing';

import { PhoneDetailService } from './phone-detail.service';

describe('PhoneDetailService', () => {
  let service: PhoneDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
