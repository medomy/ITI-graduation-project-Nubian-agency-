import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "src/environments/environment";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getStorage } from "firebase/storage";
import { provideStorage } from "@angular/fire/storage";
import { LoadingComponent } from "./shared/loading/loading.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from "./core/components/layout/navbar/navbar.component";
import { SideNavComponent } from "./core/components/layout/side-nav/side-nav.component";
import { ToastsComponent } from "./shared/toasts/toasts.component";
import { AdminServiceAddComponent } from "./components/admin-service/admin-service-add/admin-service-add.component";
import { AdminServiceAllComponent } from "./components/admin-service/admin-service-all/admin-service-all.component";
import { AdminServiceUpdateComponent } from "./components/admin-service/admin-service-update/admin-service-update.component";
import { AdminArtistAllComponent } from "./components/admin-artist/admin-artist-all/admin-artist-all.component";
import { AdminTestimonoalsAllComponent } from "./components/admin-testimonials/admin-testimonoals-all/admin-testimonoals-all.component";
import { AdminCategeoriesAllComponent } from "./components/admin-categeories/admin-categeories-all/admin-categeories-all.component";
import { AdminCategeoriesAddComponent } from "./components/admin-categeories/admin-categeories-add/admin-categeories-add.component";
import { AdminCategeoriesUpdateComponent } from "./components/admin-categeories/admin-categeories-update/admin-categeories-update.component";
import { AdminArtistAddComponent } from "./components/admin-artist/admin-artist-add/admin-artist-add.component";
import { AdminArtistUpdateComponent } from "./components/admin-artist/admin-artist-update/admin-artist-update.component";
import { AdminUsersAllComponent } from "./components/admin-users/admin-users-all/admin-users-all.component";
import { LoginComponent } from "./core/components/login/login.component";
import { AdminCustomizeOrderAllComponent } from "./components/admin-customize-order/admin-customize-order-all/admin-customize-order-all.component";
import { AdminCustomizeOrderDetailsComponent } from "./components/admin-customize-order/admin-customize-order-details/admin-customize-order-details.component";
//////////////////
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { AllUserComponent } from "./components/home/all-user/all-user.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { ChartsModule } from "ng2-charts";
import { LineChartComponent } from "./components/charts/line-chart/line-chart.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";
import { TotalRequsetComponent } from "./components/home/total-requset/total-requset.component";
import { TotalArtistComponent } from "./components/home/total-artist/total-artist.component";
import { OrdersActivitesComponent } from "./components/home/orders-activites/orders-activites.component";
import { AdminOrdersAllComponent } from "./components/admin-orders/admin-orders-all/admin-orders-all.component";
import { NotFoundComponent } from "./core/components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    SideNavComponent,
    ToastsComponent,

    ////

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
    LoginComponent,
    AdminCustomizeOrderAllComponent,
    AdminCustomizeOrderDetailsComponent,
    AllUserComponent,
    DashboardComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    TotalRequsetComponent,
    TotalArtistComponent,
    OrdersActivitesComponent,
    AdminOrdersAllComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ///
    ReactiveFormsModule,
    FormsModule,
    ////
    MatSliderModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule,

    //firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    NgbModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
