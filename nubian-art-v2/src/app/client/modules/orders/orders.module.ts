import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { CheckoutOrderComponent } from './components/checkout-order/checkout-order.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
import { CustomizeOrderComponent } from './components/customize-order/customize-order.component';
import { RequestOrderComponent } from './components/request-order/request-order.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsModule } from '../products/products.module';
import { HomeModule } from '../home/home.module';
import { ResponseOrderComponent } from './components/response-order/response-order.component';

@NgModule({
  declarations: [
    CheckoutOrderComponent,
    CompleteOrderComponent,
    CustomizeOrderComponent,
    RequestOrderComponent,
    ResponseOrderComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    ProductsModule,
    HomeModule,
  ],
})
export class OrdersModule {}
