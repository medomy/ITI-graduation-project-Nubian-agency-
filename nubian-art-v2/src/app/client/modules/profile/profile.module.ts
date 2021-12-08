import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { OrderWishlistComponent } from './components/order-wishlist/order-wishlist.component';

@NgModule({
  declarations: [
    ProfileDetailsComponent,
    ProfileEditComponent,
    OrderWishlistComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
