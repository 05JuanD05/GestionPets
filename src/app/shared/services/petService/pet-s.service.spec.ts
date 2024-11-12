import { TestBed } from '@angular/core/testing';

import { PetSService } from './pet-s.service';

describe('PetSService', () => {
  let service: PetSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
