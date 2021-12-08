import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { Color, Label } from 'ng2-charts';
import { ProductsService } from 'src/app/core/services/products/products.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartLegend = true;

  public lineChartType = 'line';

  public lineChartPlugins = [];

  constructor(private productService: ProductsService) {
    this.productService.getProducts().subscribe(async (data) => {
      let totalRate = 0;
      data.forEach((item) => {
        if (item.rate) {
          totalRate++;
        }
        this.lineChartData = [
          {
            data: [data.length],
            label: 'Total Products',
          },

          {
            data: [totalRate],
            label: 'Total Prodct Rate',
          },
        ];
      });
    });
  }

  ngOnInit(): void {}
}
