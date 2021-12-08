import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersAllComponent } from './admin-users-all.component';

describe('AdminUsersAllComponent', () => {
  let component: AdminUsersAllComponent;
  let fixture: ComponentFixture<AdminUsersAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsersAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
