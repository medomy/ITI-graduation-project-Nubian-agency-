import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-orders-activites',
  templateUrl: './orders-activites.component.html',
  styleUrls: ['./orders-activites.component.css'],
})
export class OrdersActivitesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'image',
    'product',
    'color',
    'size',
    'message',
    'user',
    'action',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products = [];
  categeory;
  checked = false;

  constructor(
    private prdService: ProductsService,
    private categoryservice: CategoriesService,
    private customorderService: CustomorderService,
    private userService: UserService
  ) {
    this.customorderService.getCustoms().subscribe(async (data) => {
      let arr = [];
      // console.log('custome', data);

      data.map((item) => {
        this.prdService.getOneProduct(item.productId).subscribe(async (prd) => {
          // console.log('prd', prd);
          this.userService.getOneUser(item.userId).subscribe(async (user) => {
            // console.log('user', user[0]);
            arr.push({
              ...item,
              productData: prd,

              userData: user,
            });
            this.dataSource = await new MatTableDataSource(arr);
          });
        });
      });

      console.log(arr);
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
