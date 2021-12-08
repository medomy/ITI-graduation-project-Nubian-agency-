import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-service-all',
  templateUrl: './admin-service-all.component.html',
  styleUrls: ['./admin-service-all.component.css'],
})
export class AdminServiceAllComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'create',
    'update',
    'action',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products = [];
  categeory;

  constructor(
    private prdService: ProductsService,
    private categoryservice: CategoriesService
  ) {
    this.prdService.getProducts().subscribe(async (data) => {
      // let categeory= this.categoryservice.getOneCategory(data.categoryID)
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);

      // await data.map(async (item) => {
      //   this.categeory = await this.categoryservice
      //     .getOneCategory(item.categoryID)
      //     .subscribe(async (data2) => {
      //       console.log(data2);
      //       // let mapITem = await { ...item, category: data2 };
      //       // await this.products.push(mapITem);
      //       // data2.forEach((element) => {
      //       //   this.products.push({ ...element, category: data2 });
      //       // });
      //     });
      // });
      // console.log(this.products);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  remove(id) {
    this.prdService.removeProduct(id);
  }
}
