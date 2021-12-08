import { AddressService } from './../address/address.service';
import { Iuser } from './../../models/user/iuser';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged,
  deleteUser,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';

import { UserService } from './../user/user.service';
import { Router } from '@angular/router';
import { WishlistService } from '../Wishlist/wishlist.service';

import { AdminService } from '../admin/admin.service';
import { AutAdminService } from './admin/aut-admin.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;
  user$: Observable<User | null>;
  loginStatus: boolean = false;
  userExists: boolean = false;
  public isAdminStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: Auth,
    private userService: UserService,
    private addressService: AddressService,
    private router: Router,
    //private wishlistservice: WishlistService,
    private adminService: AdminService
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loginStatus = true;
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedInAdmin(user.uid);
      }
    });

    // or use this version...
    this.user$ = new Observable((observer: any) =>
      onAuthStateChanged(auth, observer)
    );
  }
  async getUserObs(): Promise<User | null> {
    return await this.user$.pipe(take(1)).toPromise();
  }

  /* Login */
  async Login(data) {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      await this.router.navigate(['/home']);
    } catch (err) {
      console.log('login error', err);
      alert('user not found');
      return err;
    }
  }

  /* Login */
  async LoginAdmin(data) {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    this.router.navigate(['/admin/dashboard']);
  }

  /* Register */
  async Register(data) {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      // update user profile
      await updateProfile(credential.user, {
        displayName: data.name,
        photoURL:
          'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png',
      });

      // create user in db
      await this.userService.createUser({
        data: { ...credential.user, phoneNumber: data.phone },
      });

      // create address in db
      await this.addressService.createAddress({ data: { ...credential.user } });

      // create wishlist in db
      /*await this.wishlistservice.createWishlist({
        data: { ...credential.user },
      });*/

      //navigate home
      await this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
      alert('user aready exists');
    }
  }

  /*login  with google */
  async loginGoogle() {
    try {
      const credential = await signInWithPopup(
        this.auth,
        new GoogleAuthProvider()
      );
      await this.checkWishList(credential);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }
  /*login  with facebook */
  async loginFacebook() {
    try {
      const credential = await signInWithPopup(
        this.auth,
        new FacebookAuthProvider()
      );
      await this.checkWishList(credential);

      console.log(user);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  async resetPassword(email: string): Promise<any> {
    // sends reset password email
    await sendPasswordResetEmail(this.auth, email);
  }

  /* Logout */
  async Logout() {
    signOut(this.auth)
      .then(async () => {
        this.loginStatus = false;
        window.localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('__paypal_storage__');

        this.router.navigate(['auth/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //adminLogout
  async LogoutAdmin() {
    signOut(this.auth)
      .then(() => {
        this.loginStatus = false;
        window.localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('__paypal_storage__');
        this.router.navigate(['/admin/admin-auth/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*isLogin*/
  async isLoggedInAdmin(uid) {
    this.adminService.getAdmin(uid).subscribe(async (admin) => {
      if (admin) {
        window.localStorage.setItem(
          'admin',
          JSON.stringify({
            isAdmin: true,
          })
        );
      }
    });
  }

  get getuserLocal() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  get getUser() {
    return this.userState;
  }

  /*isLogin*/
  // get isLoggedIn(): boolean {
  //   return this.loginStatus;
  // }

  get isLoggedIn(): boolean {
    return !!this.getuserLocal;
  }

  async checkWishList(credential) {
    await (
      await this.userService.getUsers()
    ).subscribe((users) => {
      users.forEach((user) => {
        if (user.uid == credential.user.uid) {
          this.userExists = true;
        }
      });
    });

    if (this.userExists == false) {
      // create address in db
      await this.addressService.createAddress({
        data: { ...credential.user },
      });
      // create user in db
      await this.userService.createUser({
        data: { ...credential.user, phoneNumber: ' ' },
      });
      // create wishlist in db
      /*await this.wishlistservice.createWishlist({
        data: { ...credential.user },
      });*/
    }
    await this.router.navigate(['/home']);
  }

  // remeove crunnent user

  async removeCrunnetUserAuht() {
    await deleteUser(this.userState)
      .then(() => {
        console.log('userRemoved');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
