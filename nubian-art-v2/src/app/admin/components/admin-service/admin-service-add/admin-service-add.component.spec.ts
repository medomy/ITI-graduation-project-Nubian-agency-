import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceAddComponent } from './admin-service-add.component';

describe('AdminServiceAddComponent', () => {
  let component: AdminServiceAddComponent;
  let fixture: ComponentFixture<AdminServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServiceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
