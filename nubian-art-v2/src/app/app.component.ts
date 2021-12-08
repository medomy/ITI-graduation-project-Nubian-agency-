import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { AutAdminService } from './core/services/auth/admin/aut-admin.service';
import 'rxjs/add/operator/filter';
import { AdminService } from './core/services/admin/admin.service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'nubian-art';
  isRouteAdmin: boolean = false;
  isAdminLogin: boolean = false;
  admins;
  userData;

  constructor(
    private authAdminService: AutAdminService,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        if (event.route.path === 'admin') {
          this.isRouteAdmin = true;
        }
        if (event.route.path === 'admin-auth') {
          this.isAdminLogin = true;
        }
      }
    });
  }

  ngOnInit() {}
  ngOnChanges(): void {}

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        if (event.route.path === 'admin') {
          this.isRouteAdmin = true;
        }
        if (event.route.path === 'admin-auth') {
          this.isAdminLogin = true;
        }
      }
    });
  }

  get loggedInAdmin(): boolean {
    return this.authAdminService.isLoggedInAdmin;
  }
}
