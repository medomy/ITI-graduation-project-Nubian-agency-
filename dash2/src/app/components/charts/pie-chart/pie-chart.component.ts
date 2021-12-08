import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Total Product', 'Total Rate'];

  public pieChartData: SingleDataSet = [];

  public pieChartType: ChartType = 'pie';

  public pieChartLegend = true;

  public pieChartPlugins = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0'],
    },
  ];
  constructor(private productService: ProductsService) {
    this.productService.getProducts().subscribe(async (data) => {
      console.log('prd', data);
      let totalRate = 0;
      data.forEach((item) => {
        if (item.rate) {
          totalRate++;
        }
        this.pieChartData = [data.length, totalRate];
      });
    });
    monkeyPatchChartJsTooltip();

    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {}
}
