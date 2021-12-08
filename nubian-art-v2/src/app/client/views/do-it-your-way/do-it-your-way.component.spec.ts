import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoItYourWayComponent } from './do-it-your-way.component';

describe('DoItYourWayComponent', () => {
  let component: DoItYourWayComponent;
  let fixture: ComponentFixture<DoItYourWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoItYourWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoItYourWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
