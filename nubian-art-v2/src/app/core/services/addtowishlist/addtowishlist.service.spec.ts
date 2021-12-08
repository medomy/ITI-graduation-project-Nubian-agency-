import { TestBed } from '@angular/core/testing';

import { AddtowishlistService } from './addtowishlist.service';

describe('AddtowishlistService', () => {
  let service: AddtowishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtowishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
