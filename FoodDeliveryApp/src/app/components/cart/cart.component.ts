import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface DeliveryAddress {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  addressLine1: string;
  landmark: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  total: number = 0;
  private readonly deliveryFee: number = 20;
  deliveryAddressForm: FormGroup;
  showAddressForm: boolean = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.deliveryAddressForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      addressLine1: ['', [Validators.required]],
      landmark: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

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

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
  }

  onSubmit(): void {
    if (this.deliveryAddressForm.valid) {
      const address: DeliveryAddress = this.deliveryAddressForm.value;
      // Here you would typically save the address and proceed with checkout
      console.log('Delivery Address:', address);
      // Add your checkout logic here
    }
  }
} 
