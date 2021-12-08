import { TestBed } from '@angular/core/testing';

import { AutAdminService } from './aut-admin.service';

describe('AutAdminService', () => {
  let service: AutAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
