import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-do-it-your-way',
  templateUrl: './do-it-your-way.component.html',
  styleUrls: ['./do-it-your-way.component.css']
})
export class DoItYourWayComponent implements OnInit {
  prodcuts = [
    {
      img: '../../../assets/images/do-it-your-way/choose-products/White_t-shirt_mockup 1.png',
      title: 'Tshirt',
    },

    {
      img: '../../../assets/images/do-it-your-way/choose-products/9.png',
      title: 'Notebook',
    },

    {
      img: '../../../assets/images/do-it-your-way/choose-products/Mask Group.png',
      title: 'Bottle',
    },
    {
      img: '../../../assets/images/do-it-your-way/choose-products/Case__5_ 1.png',
      title: 'mobile cover',
    },
    {
      img: '../../../assets/images/do-it-your-way/choose-products/5953931.png',
      title: 'Tote bag',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
