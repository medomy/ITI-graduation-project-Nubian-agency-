import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AboutComponent } from './client/views/about/about.component';
import { DoItYourWayComponent } from './client/views/do-it-your-way/do-it-your-way.component';
import { HomeComponent } from './client/views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'do-your-way',
    component: DoItYourWayComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./client/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./client/modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./client/modules/orders/orders.module').then(
        (m) => m.OrdersModule
      ),
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./client/modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./client/modules/search/search.module').then(
        (m) => m.SearchModule
      ),
  },

  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
