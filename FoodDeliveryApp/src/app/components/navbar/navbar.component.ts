import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/">Food Delivery</a>
      </div>
      <div class="nav-links">
        <a routerLink="/restaurants">Restaurants</a>
        <a routerLink="/cart" class="cart-link">
          Cart
          <span *ngIf="itemCount > 0" class="cart-count">{{ itemCount }}</span>
        </a>
        <div class="auth-links">
          <a routerLink="/login">Login</a>
          <a routerLink="/register" class="register-btn">Register</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .nav-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4CAF50;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-links a:hover {
      color: #4CAF50;
    }

    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cart-count {
      background-color: #4CAF50;
      color: white;
      border-radius: 50%;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      min-width: 1.2rem;
      text-align: center;
    }

    .auth-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .register-btn {
      background-color: #4CAF50;
      color: white !important;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s ease !important;
    }

    .register-btn:hover {
      background-color: #45a049;
    }
  `]
})
export class NavbarComponent implements OnInit {
  itemCount = 0;

  constructor(public authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.itemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}