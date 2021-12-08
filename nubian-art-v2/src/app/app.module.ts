import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Fireabase */
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

//compoent
import { AppComponent } from './app.component';
//shared component
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './client/views/home/home.component';
import { DoItYourWayComponent } from './client/views/do-it-your-way/do-it-your-way.component';
import { AboutComponent } from './client/views/about/about.component';
import { HomeModule } from './client/modules/home/home.module';
import { ProductsModule } from './client/modules/products/products.module';
import { SharedModule } from './client/shared/shared.module';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AdminNavbarComponent } from './core/components/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './core/components/admin-footer/admin-footer.component';
import { AdminSideNavComponent } from './core/components/admin-side-nav/admin-side-nav.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    DoItYourWayComponent,
    AboutComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminSideNavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,

    //firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),

    //homeModule
    HomeModule,
    //ProductsModule
    ProductsModule,
    //SharedModule
    SharedModule,
  ],

  providers: [DecimalPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
