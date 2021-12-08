import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistUpdateComponent } from './admin-artist-update.component';

describe('AdminArtistUpdateComponent', () => {
  let component: AdminArtistUpdateComponent;
  let fixture: ComponentFixture<AdminArtistUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtistUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
