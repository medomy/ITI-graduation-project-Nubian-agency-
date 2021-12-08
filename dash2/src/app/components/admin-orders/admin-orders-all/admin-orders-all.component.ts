import { CategoriesService } from "src/app/core/services/categories/categories.service";
import { ProductsService } from "src/app/core/services/products/products.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CustomorderService } from "src/app/core/services/customorder/customorder.service";
import { UserService } from "src/app/core/services/user/user.service";
import { OrderService } from "src/app/core/services/Order/order.service";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-admin-orders-all",
  templateUrl: "./admin-orders-all.component.html",
  styleUrls: ["./admin-orders-all.component.css"],
})
export class AdminOrdersAllComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "ItemsOrder",
    "Total",
    "user",
    "address",
    "Payment",
    "create",
    "status",
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products = [];
  categeory;
  checked = false;
  paid;
  constructor(
    private prdService: ProductsService,
    private categoryservice: CategoriesService,
    private customorderService: CustomorderService,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.orderService.getOrders().subscribe(async (data) => {
      console.log(data);
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
  updatePayment(id) {
    console.log(id);
    this.orderService.updateOrder(id, {
      Ispaid: true,
    });
  }
  updateStatus(id) {
    console.log(id);
    this.orderService.updateOrder(id, {
      status: true,
    });
  }

  remove(id) {
    this.orderService.removeOrder(id);
  }
}
