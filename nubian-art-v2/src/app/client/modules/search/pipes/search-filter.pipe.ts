import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(products: any[], searchValue: string): any[] {
    if (!products) {
      return [];
    }
    if (!searchValue) {
      return products;
    }
    searchValue = searchValue.toLowerCase();
    return products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue);
    });
  }
}
