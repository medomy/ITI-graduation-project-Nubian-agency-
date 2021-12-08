import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageId;

  // the products related to current category
  categoryProducts = [];

  constructor(
    private router: ActivatedRoute,
    private ProductsService: ProductsService
  ) {
    this.router.params.subscribe((param) => {
      this.pageId = param.id;
    });

    this.ProductsService.getProducts().subscribe((products) => {
      products
        .filter((product) => product.categoryID === this.pageId)
        .forEach((product) => this.categoryProducts.push(product));
    });
  }
  ngOnInit(): void {}
}
