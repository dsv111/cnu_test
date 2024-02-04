import { TestBed } from '@angular/core/testing';

import { BloodsugarService } from './bloodsugar.service';

describe('BloodsugarService', () => {
  let service: BloodsugarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodsugarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
