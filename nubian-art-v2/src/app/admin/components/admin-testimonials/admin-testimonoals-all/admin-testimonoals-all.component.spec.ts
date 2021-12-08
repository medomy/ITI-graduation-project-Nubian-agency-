import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestimonoalsAllComponent } from './admin-testimonoals-all.component';

describe('AdminTestimonoalsAllComponent', () => {
  let component: AdminTestimonoalsAllComponent;
  let fixture: ComponentFixture<AdminTestimonoalsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTestimonoalsAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTestimonoalsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
