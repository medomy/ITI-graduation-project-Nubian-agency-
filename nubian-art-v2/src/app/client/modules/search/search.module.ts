import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    SearchComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    SearchRoutingModule, SharedModule, ProductsModule
  ], exports: [

    SearchComponent,
    SearchFilterPipe]
})
export class SearchModule { }
