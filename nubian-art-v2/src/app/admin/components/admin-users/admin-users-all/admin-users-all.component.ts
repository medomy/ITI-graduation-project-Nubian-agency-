import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-admin-users-all',
  templateUrl: './admin-users-all.component.html',
  styleUrls: ['./admin-users-all.component.css'],
})
export class AdminUsersAllComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'name', 'email', 'phone', 'verified'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userService.getUserNotAdmin().subscribe(async (data) => {
      console.log('userNot admin', data);
      this.dataSource = await new MatTableDataSource(data);
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
    this.authService.removeCrunnetUserAuht();
    this.userService.removeuser(id);
  }
}
