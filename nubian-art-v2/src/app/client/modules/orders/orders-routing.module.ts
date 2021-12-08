import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutOrderComponent } from './components/checkout-order/checkout-order.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
import { CustomizeOrderComponent } from './components/customize-order/customize-order.component';
import { ResponseOrderComponent } from './components/response-order/response-order.component';

const routes: Routes = [
  {
    path: 'complete',
    component: CompleteOrderComponent,
  },
  {
    path: 'complete/checkout',
    component: CheckoutOrderComponent,
  },
  {
    path: 'coutomize-order/:id',
    component: CustomizeOrderComponent,
  },
  {
    path: 'coutomize-order/response/:id',
    component: ResponseOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
