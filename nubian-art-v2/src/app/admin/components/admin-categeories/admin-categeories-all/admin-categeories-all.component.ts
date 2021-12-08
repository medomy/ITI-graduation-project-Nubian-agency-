import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { async } from '@firebase/util';
import { ToastsService } from 'src/app/admin/services/toasts.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-admin-categeories-all',
  templateUrl: './admin-categeories-all.component.html',
  styleUrls: ['./admin-categeories-all.component.css'],
})
export class AdminCategeoriesAllComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'created',
    'updated',
    'action',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categeoryService: CategoriesService,
    public toastService: ToastsService
  ) {
    this.categeoryService.getcategoriess().subscribe(async (data) => {
      this.dataSource = await new MatTableDataSource(data);
      console.log(data);
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
    this.categeoryService.removeCategory(id);
  }
}
