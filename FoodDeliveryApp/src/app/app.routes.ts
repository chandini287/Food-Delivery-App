import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { CartComponent } from './components/cart/cart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', redirectTo: '' }
]; 