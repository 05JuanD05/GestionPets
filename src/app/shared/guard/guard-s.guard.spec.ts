import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { guardSGuard } from './guard-s.guard';

describe('guardSGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardSGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
