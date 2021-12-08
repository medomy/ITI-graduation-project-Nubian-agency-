import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent implements OnInit {
  _data;

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(async (data) => {
      this._data = await data;
    });
  }

  ngOnInit(): void {}
}
