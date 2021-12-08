import { TestBed } from '@angular/core/testing';

import { UnAuthAdminGuard } from './un-auth-admin.guard';

describe('UnAuthAdminGuard', () => {
  let guard: UnAuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnAuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
