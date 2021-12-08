import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logoutAdmin() {
    this.authService.LogoutAdmin();
  }
  //Get User login
  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get user(): any {
    return this.authService.getuserLocal;
  }
}
