import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategeoriesAddComponent } from './admin-categeories-add.component';

describe('AdminCategeoriesAddComponent', () => {
  let component: AdminCategeoriesAddComponent;
  let fixture: ComponentFixture<AdminCategeoriesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategeoriesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategeoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
