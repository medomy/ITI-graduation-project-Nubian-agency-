import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistAllComponent } from './admin-artist-all.component';

describe('AdminArtistAllComponent', () => {
  let component: AdminArtistAllComponent;
  let fixture: ComponentFixture<AdminArtistAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtistAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
