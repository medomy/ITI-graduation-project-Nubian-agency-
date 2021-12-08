import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurArtistComponent } from './our-artist.component';

describe('OurArtistComponent', () => {
  let component: OurArtistComponent;
  let fixture: ComponentFixture<OurArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
