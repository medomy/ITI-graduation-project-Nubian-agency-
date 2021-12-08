import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";

import { Label } from "ng2-charts";
import { OrderService } from "src/app/core/services/Order/order.service";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = [];

  public barChartType: ChartType = "bar";

  public barChartLegend = true;

  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(private orderService: OrderService) {
    let ordrNotPaid = 0;
    let orderPaid = 0;
    this.orderService.getOrders().subscribe((data) => {
      data.forEach((order) => {
        if (!order.Ispaid) {
          ordrNotPaid++;
        } else if (order.Ispaid) {
        }

        this.barChartData = [
          { data: [ordrNotPaid], label: "Pending orders" },
          { data: [orderPaid], label: "Done orders" },
          { data: [data.length], label: "total orders" },
        ];
      });
    });
  }

  ngOnInit(): void {}
}
