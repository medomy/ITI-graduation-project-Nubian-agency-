import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalArtistComponent } from './total-artist.component';

describe('TotalArtistComponent', () => {
  let component: TotalArtistComponent;
  let fixture: ComponentFixture<TotalArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
