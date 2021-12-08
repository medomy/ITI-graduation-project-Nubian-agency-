import { TestBed } from '@angular/core/testing';

import { CustomorderService } from './customorder.service';

describe('CustomorderService', () => {
  let service: CustomorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
