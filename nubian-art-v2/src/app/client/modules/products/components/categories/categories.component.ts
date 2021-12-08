import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories;
  constructor(private categoryservice: CategoriesService) {
    this.categoryservice.getcategoriess().subscribe(async(data) => {
      this.categories = await data;
    
    });
  }

  ngOnInit(): void {}
    ngAfterViewInit(): void {

  this.categoryservice.getcategoriess().subscribe(async(data) => {
      this.categories = await data;
    
    });

    }
}
