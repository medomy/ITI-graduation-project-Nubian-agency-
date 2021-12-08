import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutAdminService } from '../../services/auth/admin/aut-admin.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthAdminGuard implements CanActivate {
  constructor(
    public authAdminService: AutAdminService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedin = this.authAdminService.isLoggedInAdmin;

    if (loggedin) {
      this.router.navigate(['/admin/dashboard']);
    }
    return !loggedin;
  }
}
