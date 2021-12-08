import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logoutAdmin() {
    this.authService.Logout();
  }
  //Get User login
  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get user(): any {
    return this.authService.getuserLocal;
  }
  logout() {
    this.authService.Logout();
  }
}
