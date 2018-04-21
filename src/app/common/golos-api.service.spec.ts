import { TestBed, inject } from '@angular/core/testing';

import { GolosApiService } from './golos-api.service';

describe('GolosApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GolosApiService]
    });
  });

  it('should be created', inject([GolosApiService], (service: GolosApiService) => {
    expect(service).toBeTruthy();
  }));
});
