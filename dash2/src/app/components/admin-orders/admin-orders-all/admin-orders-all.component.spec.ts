import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersAllComponent } from './admin-orders-all.component';

describe('AdminOrdersAllComponent', () => {
  let component: AdminOrdersAllComponent;
  let fixture: ComponentFixture<AdminOrdersAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
