import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../core/gurds/admin/admin-auth.guard';
import { AdminArtistAddComponent } from './components/admin-artist/admin-artist-add/admin-artist-add.component';
import { AdminArtistAllComponent } from './components/admin-artist/admin-artist-all/admin-artist-all.component';
import { AdminArtistUpdateComponent } from './components/admin-artist/admin-artist-update/admin-artist-update.component';
import { AdminCategeoriesAddComponent } from './components/admin-categeories/admin-categeories-add/admin-categeories-add.component';
import { AdminCategeoriesAllComponent } from './components/admin-categeories/admin-categeories-all/admin-categeories-all.component';
import { AdminCategeoriesUpdateComponent } from './components/admin-categeories/admin-categeories-update/admin-categeories-update.component';
import { AdminServiceAddComponent } from './components/admin-service/admin-service-add/admin-service-add.component';
import { AdminServiceAllComponent } from './components/admin-service/admin-service-all/admin-service-all.component';
import { AdminServiceUpdateComponent } from './components/admin-service/admin-service-update/admin-service-update.component';
import { AdminUsersAllComponent } from './components/admin-users/admin-users-all/admin-users-all.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin-auth',
    loadChildren: () =>
      import('./modules/admin-auth/admin-auth.module').then(
        (m) => m.AdminAuthModule
      ),
  },

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard],
  },

  {
    path: 'categeories',
    component: AdminCategeoriesAllComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'categeories/add',
    component: AdminCategeoriesAddComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'categeories/update/:id',
    component: AdminCategeoriesUpdateComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'services',
    component: AdminServiceAllComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'services/add',
    component: AdminServiceAddComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'services/update/:id',
    component: AdminServiceUpdateComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'artists',
    component: AdminArtistAllComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'artists/add',
    component: AdminArtistAddComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'artists/update/:id',
    component: AdminArtistUpdateComponent,
    canActivate: [AdminAuthGuard],
  },

  {
    path: 'users',
    component: AdminUsersAllComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
