import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArtistService } from 'src/app/core/services/Artist/artist.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
@Component({
  selector: 'app-our-artist',
  templateUrl: './our-artist.component.html',
  styleUrls: ['./our-artist.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OurArtistComponent implements OnInit {
  artists;
  department;
  constructor(
    private artistService: ArtistService,
    private categeoreoisService: CategoriesService
  ) {
    this.artistService.getArtists().subscribe(async (artists) => {
      const arr = [];
      await artists.forEach(async (item) => {
        await this.categeoreoisService
          .getOneCategory(item.department)
          .subscribe(async (_dpt) => {
            await arr.push({
              ...item,
              dpt: _dpt,
            });
          });
      });

      this.artists = arr;
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.artistService.getArtists().subscribe(async (artists) => {
      const arr = [];
      await artists.forEach(async (item) => {
        await this.categeoreoisService
          .getOneCategory(item.department)
          .subscribe(async (_dpt) => {
            await arr.push({
              ...item,
              dpt: _dpt,
            });
          });
      });

      this.artists = arr;
    });
  }
}
