import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SharedModule } from 'src/app/client/shared/shared.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AdminAuthRoutingModule, SharedModule],
})
export class AdminAuthModule {}
