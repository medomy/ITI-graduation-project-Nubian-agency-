import { CategoriesService } from "src/app/core/services/categories/categories.service";
import { ProductsService } from "src/app/core/services/products/products.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CustomorderService } from "src/app/core/services/customorder/customorder.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "app-admin-customize-order-all",
  templateUrl: "./admin-customize-order-all.component.html",
  styleUrls: ["./admin-customize-order-all.component.css"],
})
export class AdminCustomizeOrderAllComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "image",
    "product",
    "color",
    "size",
    "message",
    "user",
    "action",
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
      this.dataSource = await new MatTableDataSource(data);
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
