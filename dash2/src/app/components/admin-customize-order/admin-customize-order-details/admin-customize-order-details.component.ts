import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SnackBarService } from 'src/app/core/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-admin-customize-order-details',
  templateUrl: './admin-customize-order-details.component.html',
  styleUrls: ['./admin-customize-order-details.component.css'],
})
export class AdminCustomizeOrderDetailsComponent
  implements OnInit, AfterViewInit
{
  dataSource: MatTableDataSource<any>;

  data;
  bgColor: string;

  response = new FormGroup({
    answer: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private customizeService: CustomorderService,
    private prdService: ProductsService,
    private categoryservice: CategoriesService,
    private userService: UserService,
    private authService: AuthService,
    private snackbar: SnackBarService
  ) {
    this.router.params.subscribe((param) => {
      this.customizeService.getOneCustom(param.id).subscribe(async (item) => {
        this.prdService.getOneProduct(item.productId).subscribe(async (prd) => {
          this.userService.getOneUser(item.userId).subscribe(async (user) => {
            this.data = await {
              ...item,
              productData: prd,

              userData: user,
            };

            console.log(this.data);
          });
        });
      });
    });
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  get answer() {
    return this.response.get('answer');
  }

  get admin() {
    return this.authService.getuserLocal;
  }
  adminResponse() {
    if (!this.response.valid) {
      return;
    } else {
      this.customizeService
        .updateCustom(this.data.id, {
          prodcutData: this.data.productData,
          AdminResponse: this.answer.value,
          adminId: { uid: this.admin.uid, nam: this.admin.displayName },
          DateConfirm: new Date().toDateString(),
        })
        .then(() => {
          this.snackbar.openAdminResSnackBar();
        })
        .then(() => {
          this.route.navigate(['/admin/customize-order']);
        });
    }
  }
}
