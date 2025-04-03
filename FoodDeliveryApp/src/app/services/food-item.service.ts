import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private apiUrl = 'https://localhost:7246/api/fooditems';

  constructor(private http: HttpClient) { }

  getFoodItemsByRestaurant(restaurantId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.apiUrl}?restaurantId=${restaurantId}`);
  }
}