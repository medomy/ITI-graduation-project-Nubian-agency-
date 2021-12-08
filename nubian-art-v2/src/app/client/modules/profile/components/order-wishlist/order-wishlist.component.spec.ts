import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWishlistComponent } from './order-wishlist.component';

describe('OrderWishlistComponent', () => {
  let component: OrderWishlistComponent;
  let fixture: ComponentFixture<OrderWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
