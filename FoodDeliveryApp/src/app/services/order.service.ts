import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.service';

export interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  orderItems: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  foodItemId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  deliveryAddress: string;
  orderItems: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5089/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(cartItems: CartItem[], deliveryAddress: string): Observable<Order> {
    const orderItems: OrderItem[] = cartItems.map(item => ({
      foodItemId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const request: CreateOrderRequest = {
      deliveryAddress,
      orderItems
    };

    return this.http.post<Order>(this.apiUrl, request);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}`, { status });
  }
}
