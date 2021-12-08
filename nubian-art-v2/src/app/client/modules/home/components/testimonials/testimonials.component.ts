import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  reviews: any = [
    {
      img: 'https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/testimonial/1.jpg',
      name: 'Michelle Anderson',
      rating: 5,
      comment:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.  Morbi  leo  risus,  porta ac consectetur ac, vestibulum at eros.',
        dir: 'left',

    },
    {
      img: 'https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/testimonial/1.jpg',
      name: 'Michelle Anderson',
      rating: 5,
      comment:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.  Morbi  leo  risus,  porta ac consectetur ac, vestibulum at eros.',
      dir: 'right',
    },
    {
      img: 'https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/testimonial/1.jpg',
      name: 'Michelle Anderson',
      rating: 5,
      comment:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.  Morbi  leo  risus,  porta ac consectetur ac, vestibulum at eros.',
        dir: 'left',

    },
    {
      img: 'https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/testimonial/1.jpg',
      name: 'Michelle Anderson',
      rating: 5,
      comment:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.  Morbi  leo  risus,  porta ac consectetur ac, vestibulum at eros.',
      dir: 'right',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
