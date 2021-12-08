import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPassword: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newPassword = this.fb.group({
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }
  saveNewPassword() {
    if (!this.newPassword.valid) return;
    console.log(this.newPassword.value);
  }
}
