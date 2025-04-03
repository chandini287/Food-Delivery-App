import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurantId: number;
  restaurantName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems.next(JSON.parse(savedCart));
      }
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addItem(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartItems.next(currentItems);
    this.saveCart();
  }

  removeItem(itemId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(itemId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next(currentItems);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCart();
  }

  private saveCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }
} 