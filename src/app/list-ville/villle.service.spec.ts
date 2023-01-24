import { TestBed } from '@angular/core/testing';

import { VillleService } from './villle.service';

describe('VillleService', () => {
  let service: VillleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
