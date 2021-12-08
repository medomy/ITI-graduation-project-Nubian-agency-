import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategeoriesUpdateComponent } from './admin-categeories-update.component';

describe('AdminCategeoriesUpdateComponent', () => {
  let component: AdminCategeoriesUpdateComponent;
  let fixture: ComponentFixture<AdminCategeoriesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategeoriesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategeoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
