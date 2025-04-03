import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  total: number = 0;
  private readonly deliveryFee: number = 2.99;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateTotals();
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
    this.updateTotals();
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
    this.updateTotals();
  }

  private updateTotals(): void {
    this.subtotal = this.cartService.getTotal();
    this.total = this.subtotal + this.deliveryFee;
  }
} 