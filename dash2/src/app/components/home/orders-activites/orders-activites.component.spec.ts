import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersActivitesComponent } from './orders-activites.component';

describe('OrdersActivitesComponent', () => {
  let component: OrdersActivitesComponent;
  let fixture: ComponentFixture<OrdersActivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersActivitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
