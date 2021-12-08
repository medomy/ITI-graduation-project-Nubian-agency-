import { Component, OnInit } from '@angular/core';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';

@Component({
  selector: 'app-total-requset',
  templateUrl: './total-requset.component.html',
  styleUrls: ['./total-requset.component.css'],
})
export class TotalRequsetComponent implements OnInit {
  orderResponse;
  orderPending;
  ordData;
  constructor(private customizeOrderServcice: CustomorderService) {
    this.customizeOrderServcice.getCustoms().subscribe((data) => {
      console.log('cord', data);
      let itemRes = 0;
      let itemPend = 0;
      data.forEach((item) => {
        if (item.AdminResponse) {
          itemRes++;
        }

        if (!item.AdminResponse) {
          itemPend++;
        }
        this.orderResponse = itemRes;
        this.orderPending = itemPend;
      });

      this.ordData = data;
    });
  }

  ngOnInit(): void {}
}
