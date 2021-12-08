import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomorderService } from '../../services/customorder/customorder.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  ResponseDataOrder: Array<any> = [];
  hidden = false;
  userData;

  constructor(
    private authService: AuthService,
    private customeService: CustomorderService,
    private userServive: UserService,
    private router: Router
  ) {
    if (this.user) {
      this.customeService
        .getCustomOrderByUserUid(this.user.uid)
        .subscribe((data) => {
          let arr = [];

          data.forEach((res) => {
            if (res.AdminResponse) arr.push(res);
          });

          console.log(arr);
          this.ResponseDataOrder = arr;
        });
    }

    this.userData = this.userServive
      .getOneUser(this.user.uid)
      .subscribe(async (data) => {
        this.userData = await data;
      });
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  logout() {
    this.authService.Logout();
  }
  viewCustomePrd(idOrder, idItem) {
    console.log(idItem);
    this.customeService
      .updateCustom(idOrder, {
        isView: true,
      })
      .then(() => {
        this.router.navigate([`/orders/coutomize-order/response/${idItem}`]);
      });
  }
  //Get User login
  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get user(): any {
    return this.authService.getuserLocal;
  }
}
