import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategeoriesAllComponent } from './admin-categeories-all.component';

describe('AdminCategeoriesAllComponent', () => {
  let component: AdminCategeoriesAllComponent;
  let fixture: ComponentFixture<AdminCategeoriesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategeoriesAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategeoriesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
