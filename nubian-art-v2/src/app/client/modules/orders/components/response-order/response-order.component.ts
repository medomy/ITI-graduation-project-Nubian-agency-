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

@Component({
  selector: 'app-response-order',
  templateUrl: './response-order.component.html',
  styleUrls: ['./response-order.component.css'],
})
export class ResponseOrderComponent implements OnInit {
  pageId;
  product;
  sizeValue: string = '';
  colorValue: string = '';
  specialReqValue: string = '';
  photoFile: File;
  IsUploaded: boolean = false;
  addSuccess: boolean = false;
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
    private route: Router
  ) {
    this.router.params.subscribe((params) => {
      this.pageId = params.id;
      this.customservice.getCustomOrderByprdId(params.id).subscribe((data) => {
        console.log(data);
        this.product = data;
        console.log('product', this.product);
      });
    });
  }

  ngOnInit(): void {}
  handleFileChange(event) {
    this.photoFile = event.target.files[0];
  }
  confirmOrder() {
    const storage = getStorage();
    const custRef = ref(
      storage,
      'custimize-orders-photos/' + this.photoFile.name + Date.now()
    );
    const metadata = {
      contentType: 'image',
    };
    const uploadTask = uploadBytesResumable(custRef, this.photoFile, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.customservice.addCustom({
            productData: this.product,
            userData: this.authservice.getuserLocal,
            productId: this.product.id,
            photoUrl: downloadURL,
            userId: this.authservice.getuserLocal.uid,
            frameColor: this.colorValue,
            specialOrder: this.specialReqValue,
            desiredSize: this.sizeValue,
            timeStamp: {
              createdAt: new Date().toDateString(),
              removedAt: null,
              updatedAt: new Date().toDateString(),
            },
          });
          1;
          this.IsUploaded = true;
          setTimeout(() => {
            this.route.navigate(['']);
          }, 1500);
        });
      }
    );
  }
}
