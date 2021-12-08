import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { OrderWishlistComponent } from '../order-wishlist/order-wishlist.component';
import { ChildActivationEnd } from '@angular/router';
import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AddtowishlistService } from 'src/app/core/services/addtowishlist/addtowishlist.service';
import { OrderService } from 'src/app/core/services/Order/order.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit, DoCheck, AfterViewInit {
  phoneNumber: string;
  location: string;
  displayName: string;
  photoUrl: string;
  isEdit: boolean = false;
  photoFile: File;
  // to take the id in update user
  user: any;
  // to get wishlist
  wishListProductsIds: Array<string> = [];
  wishListProducts: Array<any> = [];
  _wishlistProducts: Array<any> = [];
  wishListId: string;
  addedProductsId: Array<string> = []; // comming from addtowishlist stream
  // for orders sec
  orders: Array<any> = [];
  orderedProducts: Array<any> = [];
  orderCounter: number = 0;
  _orderedProducts: Array<any> = [];
  progress;
  editForm;
  uploadSuccess: boolean = false;

  constructor(
    private authservice: AuthService,
    private userService: UserService,
    private wishlistservice: WishlistService,
    private productssrvice: ProductsService,
    private addtowishlistservice: AddtowishlistService,
    private orderservice: OrderService,
    private fb: FormBuilder
  ) {
    this.userService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        if (user.uid == this._user.uid) {
          this.user = user;
        }
      });

      // setting coming properties in variables
      this.location = this.user.location || 'New york';
      this.phoneNumber = this.user.phoneNumber;
      this.displayName = this.user.displayName;
      this.photoUrl = this.user.avatar;
    });
    /*this.addtowishlistservice
      .getWishList()
      .subscribe(
        (wishlistProducts) => (this.addedProductsId = wishlistProducts)
      );
    this.wishlistservice
      .getWishListByUid(this.authservice.getuserLocal.uid)
      .then((wishlist) => {
        this.wishListId = wishlist.id;
        this.wishListProductsIds = wishlist.productsIds;
        this.wishListProductsIds.forEach((productid) => {
          this.productssrvice
            .getOneProduct(productid)
            .subscribe((product) => this.wishListProducts.push(product));
        });
      });
    this.wishListProducts = this._wishlistProducts;*/
    // to get orders
    this.orderservice.getOrdersForUser().subscribe((_orders) => {
      console.log(_orders);
      this.orders = _orders;
      this.orders.forEach((order) => {
        this.orderCounter += 1;
      });
    });
    /*_orders[_orders.length-1].cartItems.forEach((item) => {
        this.productssrvice
          .getOneProduct(item.productId)
          .subscribe((product) => {
            this._orderedProducts.push(product);
          });
      });/*
      
    ;

    this.orderedProducts = this._orderedProducts
    if(this.orderedProducts.length !==this._orderedProducts.length ){
      this.orderedProducts.forEach((ordered,index)=>{
        this.orderedProducts.splice(1,index);
      })
    }*/

    //console.log(this.orderedProducts);
  }

  ngOnInit(): void {
    console.log(this.isEdit);
    this.editForm = this.fb.group({
      phoneNumber: [''],
      location: [''],
    });
  }
  ngDoCheck() {
    //console.log("location", this.location)
    //console.log("user", this.user)
    //console.log("user", this.photoUrl)
    //console.log("wishlist", this.wishListProducts)
    //console.log(this.user);
  }

  ngAfterViewInit() {
    // getting wish list after view (tried it only don't know if it's right)
  }
  // not used here at all
  get _user(): any {
    return this.authservice.getuserLocal;
  }
  // capturing the img file
  handleFileChange(event) {
    this.photoFile = event.target.files[0];
  }
  // removal from wishlist function
  /*recieveProduct(product) {
    this.wishListProductsIds.forEach((productId, index) => {
      if (product.id == productId) {
        this.wishListProductsIds.splice(index, 1);
        this.wishListProducts.splice(index, 1);
        this.addedProductsId.splice(index, 1);
      }
    });
    this.wishlistservice.updateWishlist(this.wishListId, {
      productsIds: this.wishListProductsIds,
    });
    console.log(this.wishListProductsIds);
  }*/
  // Update after Uploading photo
  updateProfile() {
    //this.isEdit = false;
    // consider not uploading photo when editing
    if (this.photoFile) {
      // profile photo edit and other properties
      const storage = getStorage();
      const custRef = ref(
        storage,
        'profile-photos/' + this._user.uid + Date.now()
      );
      const metadata = {
        contentType: 'image',
      };
      const uploadTask = uploadBytesResumable(
        custRef,
        this.photoFile,
        metadata
      );
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress = progress;
          if (progress == 100) {
            this.uploadSuccess = true;
          }
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              this.progress = 'paused';
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
              alert("You don't have permession to upload");
              break;
            case 'storage/canceled':
              // User canceled the upload
              alert('Upload is canceled');
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
            this.userService.updateUser(this.user.id, {
              phoneNumber: this.phoneNumber,
              location: this.location,
              displayName: this.displayName,
              avatar: downloadURL,
            });
          });
        }
      );
    }
    // not editting photos
    else {
      this.userService.updateUser(this.user.id, {
        phoneNumber: this.phoneNumber,
        location: this.location,
        displayName: this.displayName,
      });
    }
  }
  // the edit button function to show the templates or not
  setIsEdit() {
    this.isEdit = true;
  }
}
