import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { Restaurant } from '../../models/restaurant.model';
import { FoodItem } from '../../models/food-item.model';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | null = null;
  loading = true;
  error: string | null = null;
  cartItems: CartItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.loadRestaurant(id);
    } else {
      this.error = 'Invalid restaurant ID';
      this.loading = false;
    }

    // Subscribe to cart changes
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  loadRestaurant(id: number): void {
    this.loading = true;
    this.error = null;
    this.restaurantService.getRestaurantById(id).subscribe({
      next: (data) => {
        this.restaurant = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load restaurant details. Please try again later.';
        this.loading = false;
      }
    });
  }

  getCartItemQuantity(itemId: number): number {
    const cartItem = this.cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  }

  addToCart(item: FoodItem): void {
    if (!this.restaurant) return;
    
    this.cartService.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      restaurantId: this.restaurant.id,
      restaurantName: this.restaurant.name
    });
  }

  updateQuantity(item: FoodItem, increment: boolean): void {
    if (!this.restaurant) return;
    
    const currentQuantity = this.getCartItemQuantity(item.id);
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    } else {
      this.cartService.removeItem(item.id);
    }
  }

  isInCart(itemId: number): boolean {
    return this.cartItems.some(item => item.id === itemId);
  }
} 