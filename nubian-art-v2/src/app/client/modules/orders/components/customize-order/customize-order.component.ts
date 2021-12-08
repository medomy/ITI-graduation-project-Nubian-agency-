import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert } from 'src/app/core/models/alert/alert';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-customize-order',
  templateUrl: './customize-order.component.html',
  styleUrls: ['./customize-order.component.css'],
})
export class CustomizeOrderComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean = false;
  addSuccess: boolean = false;

  selectedFiles;
  sen;
  pageId;
  product;
  sizeValue: string = '';
  colorValue: string = '';
  specialReqValue: string = '';

  alerts: Alert[] = [
    {
      type: 'info',
      message:
        "We've recieved your request and will respond to your E-mail in about 48 hours",
    },
  ];
  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private customservice: CustomorderService,
    private authservice: AuthService,
    private route: Router,
    private http: HttpClient,
    private uploadService: StorageService
  ) {
    this.router.params.subscribe((params) => (this.pageId = params.id));

    this.productsService
      .getOneProduct(this.pageId)
      .subscribe((_product) => (this.product = _product));
  }

  ngOnInit(): void {}

  confirmOrder() {
    this.uploadService
      .upload(
        'custimize-orders-photos/',
        this.selectedFiles[0].name,
        this.selectedFiles[0]
      )
      .then((data) => {
        if (data && this.selectedFiles && this.uploadSuccess) {
          this.customservice
            .addCustom({
              productData: this.product,
              userData: this.authservice.getuserLocal,

              productId: this.product.id,
              photoUrl: data,
              userId: this.authservice.getuserLocal.uid,
              frameColor: this.colorValue,
              specialOrder: this.specialReqValue,
              desiredSize: this.sizeValue,
              timeStamp: {
                createdAt: new Date().toDateString(),
                removedAt: null,
                updatedAt: new Date().toDateString(),
              },
            })
            .then(() => {
              this.addSuccess = true;
              setTimeout(() => {
                this.route.navigate(['']);
              }, 1000);
            });
        }
      });
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
    this.selectedFiles = files;
  }

  uploadAndProgress(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));

    this.http
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(files);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }
}
