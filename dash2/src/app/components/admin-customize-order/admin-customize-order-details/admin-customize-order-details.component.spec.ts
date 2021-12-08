import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomizeOrderDetailsComponent } from './admin-customize-order-details.component';

describe('AdminCustomizeOrderDetailsComponent', () => {
  let component: AdminCustomizeOrderDetailsComponent;
  let fixture: ComponentFixture<AdminCustomizeOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomizeOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomizeOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
