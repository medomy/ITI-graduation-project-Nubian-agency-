import { Injectable } from '@angular/core';

import { Auth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('admin', JSON.stringify(user));
      }
    });
  }

  /* Login */
  async Login(data) {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    await this.router.navigate(['']);
  }

  /* Logout */
  async Logout() {
    signOut(this.auth)
      .then(async () => {
        window.localStorage.removeItem('admin');
        this.router.navigate(['admin/auth/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  get getuserLocal() {
    return JSON.parse(window.localStorage.getItem('admin'));
  }

  get isLoggedIn(): boolean {
    return !!this.getuserLocal;
  }
}
