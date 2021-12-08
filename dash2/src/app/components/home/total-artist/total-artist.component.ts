import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/core/services/Artist/artist.service';

@Component({
  selector: 'app-total-artist',
  templateUrl: './total-artist.component.html',
  styleUrls: ['./total-artist.component.css'],
})
export class TotalArtistComponent implements OnInit {
  _data;
  constructor(private artisSerivce: ArtistService) {
    this.artisSerivce.getArtists().subscribe(async (data) => {
      this._data = await data;
    });
  }

  ngOnInit(): void {}
}
