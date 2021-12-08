import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  {
    path: 'service',
    component: CategoriesComponent,
    children: [],
  },
  {
    path: 'list/:id',
    component: ProductListComponent,
    children: [],
  },
  {
    path: 'list/:id/details/:pid',
    component: ProductDetailsComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
