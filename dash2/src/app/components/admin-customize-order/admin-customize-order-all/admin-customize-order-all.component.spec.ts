import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomizeOrderAllComponent } from './admin-customize-order-all.component';

describe('AdminCustomizeOrderAllComponent', () => {
  let component: AdminCustomizeOrderAllComponent;
  let fixture: ComponentFixture<AdminCustomizeOrderAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomizeOrderAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomizeOrderAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
