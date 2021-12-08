import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user!: FormGroup;
  passVisible: boolean = true;
  // /^(010|011|012)[0-9]{8}/
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        // [Validators.required, Validators.pattern('1[0125][0-9]{8}$')],
        [Validators.required],
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
  get name() {
    return this.user.get('name');
  }

  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
  }

  get phone() {
    return this.user.get('phone');
  }

  register() {
    if (!this.user.valid) return;
    this.authService.Register(this.user.value);
  }

  ShowPassword() {
    if (this.passVisible === true) {
      this.passVisible = false;
    } else {
      this.passVisible = true;
    }
  }
}
