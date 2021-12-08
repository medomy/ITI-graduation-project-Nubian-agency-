import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceAllComponent } from './admin-service-all.component';

describe('AdminServiceAllComponent', () => {
  let component: AdminServiceAllComponent;
  let fixture: ComponentFixture<AdminServiceAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServiceAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServiceAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
