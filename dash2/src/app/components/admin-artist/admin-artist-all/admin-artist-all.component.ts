import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from 'src/app/core/services/Artist/artist.service';

@Component({
  selector: 'app-admin-artist-all',
  templateUrl: './admin-artist-all.component.html',
  styleUrls: ['./admin-artist-all.component.css'],
})
export class AdminArtistAllComponent implements OnInit {
  displayedColumns: string[] = [
    'avatar',
    'name',
    'email',
    'country',
    'gender',
    'dateOfBirth',
    'action',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private artistService: ArtistService) {
    this.artistService.getArtists().subscribe(async (data) => {
      this.dataSource = await new MatTableDataSource(data);
      console.log(this.dataSource);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  remove(id) {
    console.log(id);
    this.artistService.removeArtist(id);
  }
}
