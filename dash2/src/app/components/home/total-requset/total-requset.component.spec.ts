import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRequsetComponent } from './total-requset.component';

describe('TotalRequsetComponent', () => {
  let component: TotalRequsetComponent;
  let fixture: ComponentFixture<TotalRequsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalRequsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRequsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
