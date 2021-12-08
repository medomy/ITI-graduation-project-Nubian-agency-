import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../client/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminServiceAddComponent } from './components/admin-service/admin-service-add/admin-service-add.component';
import { AdminServiceAllComponent } from './components/admin-service/admin-service-all/admin-service-all.component';
import { AdminServiceUpdateComponent } from './components/admin-service/admin-service-update/admin-service-update.component';
import { AdminArtistAllComponent } from './components/admin-artist/admin-artist-all/admin-artist-all.component';
import { AdminTestimonoalsAllComponent } from './components/admin-testimonials/admin-testimonoals-all/admin-testimonoals-all.component';
import { AdminCategeoriesAllComponent } from './components/admin-categeories/admin-categeories-all/admin-categeories-all.component';
import { AdminCategeoriesAddComponent } from './components/admin-categeories/admin-categeories-add/admin-categeories-add.component';
import { AdminCategeoriesUpdateComponent } from './components/admin-categeories/admin-categeories-update/admin-categeories-update.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastsComponent } from './shared/toasts/toasts.component';
import { AdminArtistAddComponent } from './components/admin-artist/admin-artist-add/admin-artist-add.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AdminArtistUpdateComponent } from './components/admin-artist/admin-artist-update/admin-artist-update.component';
import { AdminUsersAllComponent } from './components/admin-users/admin-users-all/admin-users-all.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AdminServiceAddComponent,
    AdminServiceAllComponent,
    AdminServiceUpdateComponent,
    AdminArtistAllComponent,
    AdminTestimonoalsAllComponent,
    AdminCategeoriesAllComponent,
    AdminCategeoriesAddComponent,
    AdminCategeoriesUpdateComponent,
    ToastsComponent,
    AdminArtistAddComponent,
    LoadingComponent,
    AdminArtistUpdateComponent,
    AdminUsersAllComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class AdminModule {}
