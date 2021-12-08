import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { MoreLikeComponent } from './components/more-like/more-like.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CartComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    ProductListComponent,
    MoreLikeComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, HomeModule],
  exports: [CategoriesComponent, ProductItemComponent, MoreLikeComponent],
})
export class ProductsModule {}
