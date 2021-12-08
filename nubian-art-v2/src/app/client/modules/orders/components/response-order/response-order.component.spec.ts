import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseOrderComponent } from './response-order.component';

describe('ResponseOrderComponent', () => {
  let component: ResponseOrderComponent;
  let fixture: ComponentFixture<ResponseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
