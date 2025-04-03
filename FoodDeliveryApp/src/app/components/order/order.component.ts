import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    public router: Router
  ) {
    this.orderForm = this.fb.group({
      deliveryAddress: ['', [Validators.required, Validators.minLength(10)]],
      specialInstructions: ['']
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      if (items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.loading = true;
      this.error = null;

      this.orderService.createOrder(
        this.cartItems,
        this.orderForm.get('deliveryAddress')?.value
      ).subscribe({
        next: (order: Order) => {
          this.success = true;
          this.cartService.clearCart();
          setTimeout(() => {
            this.router.navigate(['/orders']);
          }, 2000);
        },
        error: (error: { error: { message: string } }) => {
          this.error = error.error.message || 'Failed to place order. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getDeliveryFee(): number {
    return 5.00; // Fixed delivery fee
  }

  getFinalTotal(): number {
    return this.getTotal() + this.getDeliveryFee();
  }
} 