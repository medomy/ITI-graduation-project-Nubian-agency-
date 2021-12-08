import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { errorPrefix } from '@firebase/util';
import { Alert } from 'src/app/core/models/alert/alert';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  passVisible: boolean = true;
  error;
  alerts: Alert[] = [
    {
      type: 'danger ',
      message: "E-mail doesn't exist",
    },
  ];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}'
          ),
        ],
      ],
    });
  }
  //get usercontrols
  get userControls() {
    return this.user.controls;
  }
  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
  }

  login() {
    try {
      this.authService.Login(this.user.value);
    } catch (err) {
      this.error = err;
    }
  }

  loginWithGoogle() {
    console.log('login with google');
    this.authService.loginGoogle();
  }
  loginWithFacebook() {
    console.log('login with facebook');
    this.authService.loginFacebook();
  }

  ShowPassword() {
    if (this.passVisible === true) {
      this.passVisible = false;
    } else {
      this.passVisible = true;
    }
  }
}
