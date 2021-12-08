import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistAddComponent } from './admin-artist-add.component';

describe('AdminArtistAddComponent', () => {
  let component: AdminArtistAddComponent;
  let fixture: ComponentFixture<AdminArtistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtistAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
