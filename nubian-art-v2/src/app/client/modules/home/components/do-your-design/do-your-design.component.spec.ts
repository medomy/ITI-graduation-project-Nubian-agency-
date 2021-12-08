import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoYourDesignComponent } from './do-your-design.component';

describe('DoYourDesignComponent', () => {
  let component: DoYourDesignComponent;
  let fixture: ComponentFixture<DoYourDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoYourDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoYourDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
