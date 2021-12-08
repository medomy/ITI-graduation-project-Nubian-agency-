import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoYourDesignComponent } from './components/do-your-design/do-your-design.component';
import { SwiperModule } from 'swiper/angular';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { OurArtistComponent } from './components/our-artist/our-artist.component';
import { HeaderComponent } from './components/header/header.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HowItWorkComponent,
    OurArtistComponent,
    TestimonialsComponent,
    WhyUsComponent,
    DoYourDesignComponent,
  ],
  imports: [CommonModule, SwiperModule, SharedModule],
  exports: [
    HeaderComponent,
    HowItWorkComponent,
    OurArtistComponent,
    TestimonialsComponent,
    WhyUsComponent,
    DoYourDesignComponent,
  ],
})
export class HomeModule {}
