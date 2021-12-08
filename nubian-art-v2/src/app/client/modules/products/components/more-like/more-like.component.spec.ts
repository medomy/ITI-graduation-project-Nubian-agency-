import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLikeComponent } from './more-like.component';

describe('MoreLikeComponent', () => {
  let component: MoreLikeComponent;
  let fixture: ComponentFixture<MoreLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
