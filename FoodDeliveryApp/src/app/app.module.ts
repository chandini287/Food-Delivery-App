import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
      { path: 'restaurants', loadComponent: () => import('./components/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent) },
      { path: 'restaurants/:id', loadComponent: () => import('./components/restaurant-details/restaurant-details.component').then(m => m.RestaurantDetailsComponent) },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
      { path: 'orders', loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent) },
      { path: 'login', loadComponent: () => import('./components/user-login/user-login.component').then(m => m.UserLoginComponent) },
      { path: 'register', loadComponent: () => import('./components/user-register/user-register.component').then(m => m.UserRegisterComponent) },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: []
})
export class AppModule { }