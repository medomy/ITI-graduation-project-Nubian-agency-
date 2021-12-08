import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class HeaderComponent implements OnInit {
  Images = [
    {
      src: '../../../../assets/images/nubian/bottles cover 2.png',
      alt: 'Bottels cover nubian agancy art iti-final project track front-end and cross platform',
    },
    {
      src: '../../../../assets/images/nubian/bottles cover 2.png',
      alt: 'Bottels cover nubian agancy art iti-final project track front-end and cross platform',
    },
  ]

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  constructor() { }

  ngOnInit(): void {
  }

}
