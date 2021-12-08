import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule } from 'ng2-charts';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //ng bootsrap
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    //NgxSlide
    NgxSliderModule,

    //swiper
    SwiperModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    //ng bootsrap
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    //NgxSlide
    NgxSliderModule,

    //swiper
    SwiperModule,
    ChartsModule,
    LoadingComponent

    //
  ],
})
export class SharedModule {}
