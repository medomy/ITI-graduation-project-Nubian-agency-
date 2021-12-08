import { Injectable } from '@angular/core';
import {
  Auth,
  user,
  User,
  authState,
  signOut,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { AdminService } from '../../admin/admin.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AutAdminService {
  isAdminStatus: boolean = false;
  user$: Observable<User | null>;

  isAdminLogin;
  constructor(
    private auth: Auth,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  /* Login */
  async LoginAdmin(data) {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    this.router.navigate(['/admin/dashboard']);
  }

  get user(): any {
    return this.authService.getuserLocal;
  }

  get getIsAdminLocal(): any {
    return JSON.parse(window.localStorage.getItem('admin'));
  }
  /*isLogin*/
  get isLoggedInAdmin(): boolean {
    return !!this.getIsAdminLocal;
  }
}
