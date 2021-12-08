import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthAdminGuard } from 'src/app/core/gurds/admin/un-auth-admin.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent,
    canActivate: [UnAuthAdminGuard],
  },
  {
    path: '',
    component: AdminLoginComponent,
    canActivate: [UnAuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAuthRoutingModule {}
