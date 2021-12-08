import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  veriedCodeForm: FormGroup;
  veriedCodeStatus: boolean = false;
  newPasswordStatus: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {
    this.resetPassword = this.fb.group({
      email: ['', [Validators.required]],
    });
    this.veriedCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.veriedCodeForm.valueChanges.subscribe(() => {
      if (!this.veriedCodeForm.valid) return;
      this.newPasswordStatus = true;
    });
  }

  //get usercontrols
  get resetPasswordControls() {
    return this.resetPassword.controls;
  }

  sendCode() {
    if (!this.resetPassword.valid) return;
    this.veriedCodeStatus = true;
    console.log('phone number reset password', this.resetPassword.value);
    this.authservice.resetPassword(this.resetPassword.value.email);
  }
}
