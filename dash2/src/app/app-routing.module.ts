import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminArtistAddComponent } from "./components/admin-artist/admin-artist-add/admin-artist-add.component";
import { AdminArtistAllComponent } from "./components/admin-artist/admin-artist-all/admin-artist-all.component";
import { AdminArtistUpdateComponent } from "./components/admin-artist/admin-artist-update/admin-artist-update.component";
import { AdminCategeoriesAddComponent } from "./components/admin-categeories/admin-categeories-add/admin-categeories-add.component";
import { AdminCategeoriesAllComponent } from "./components/admin-categeories/admin-categeories-all/admin-categeories-all.component";
import { AdminCategeoriesUpdateComponent } from "./components/admin-categeories/admin-categeories-update/admin-categeories-update.component";
import { AdminCustomizeOrderAllComponent } from "./components/admin-customize-order/admin-customize-order-all/admin-customize-order-all.component";
import { AdminCustomizeOrderDetailsComponent } from "./components/admin-customize-order/admin-customize-order-details/admin-customize-order-details.component";
import { AdminOrdersAllComponent } from "./components/admin-orders/admin-orders-all/admin-orders-all.component";
import { AdminServiceAddComponent } from "./components/admin-service/admin-service-add/admin-service-add.component";
import { AdminServiceAllComponent } from "./components/admin-service/admin-service-all/admin-service-all.component";
import { AdminServiceUpdateComponent } from "./components/admin-service/admin-service-update/admin-service-update.component";
import { AdminUsersAllComponent } from "./components/admin-users/admin-users-all/admin-users-all.component";
import { LoginComponent } from "./core/components/login/login.component";
import { NotFoundComponent } from "./core/components/not-found/not-found.component";
import { AuthRequiredGuard } from "./core/gurds/auth-required.guard";
import { UnAuthRequiredGuard } from "./core/gurds/un-auth-required.guard";
import { DashboardComponent } from "./views/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/auth/login",
    component: LoginComponent,
    canActivate: [UnAuthRequiredGuard],
  },
  {
    path: "admin/dashboard",
    component: DashboardComponent,
    canActivate: [AuthRequiredGuard],
  },

  {
    path: "admin/categeories",
    component: AdminCategeoriesAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/categeories/add",
    component: AdminCategeoriesAddComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/categeories/update/:id",
    component: AdminCategeoriesUpdateComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/services",
    component: AdminServiceAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/services/add",
    component: AdminServiceAddComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/services/update/:id",
    component: AdminServiceUpdateComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/artists",
    component: AdminArtistAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/artists/add",
    component: AdminArtistAddComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/artists/update/:id",
    component: AdminArtistUpdateComponent,
  },

  {
    path: "admin/users",
    component: AdminUsersAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/orders",
    component: AdminOrdersAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/customize-order",
    component: AdminCustomizeOrderAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/customize-order",
    component: AdminCustomizeOrderAllComponent,
    canActivate: [AuthRequiredGuard],
  },
  {
    path: "admin/customize-order/details/:id",
    component: AdminCustomizeOrderDetailsComponent,
    canActivate: [AuthRequiredGuard],
  },

  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
