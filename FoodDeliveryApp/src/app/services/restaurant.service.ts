import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Pizza Palace',
      description: 'Authentic Italian pizzas made with fresh ingredients',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '30-45 min',
      minimumOrder: 15.00,
      foodItems: [
        {
          id: 1,
          name: 'Margherita Pizza',
          description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
          price: 12.99,
          imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60',
          restaurantId: 1
        },
        {
          id: 2,
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni with melted cheese',
          price: 14.99,
          imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60',
          restaurantId: 1
        },
        {
          id: 3,
          name: 'Vegetarian Pizza',
          description: 'Bell peppers, mushrooms, onions, and olives',
          price: 13.99,
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
          restaurantId: 1
        }
      ]
    },
    {
      id: 2,
      name: 'Burger House',
      description: 'Gourmet burgers with premium ingredients',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
      cuisine: 'American',
      rating: 4.3,
      deliveryTime: '25-35 min',
      minimumOrder: 12.00,
      foodItems: [
        {
          id: 4,
          name: 'Classic Burger',
          description: 'Beef patty with lettuce, tomato, and special sauce',
          price: 9.99,
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
          restaurantId: 2
        },
        {
          id: 5,
          name: 'Cheese Burger',
          description: 'Classic burger with melted cheddar cheese',
          price: 10.99,
          imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60',
          restaurantId: 2
        },
        {
          id: 6,
          name: 'Bacon Burger',
          description: 'Classic burger with crispy bacon strips',
          price: 11.99,
          imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop&q=60',
          restaurantId: 2
        }
      ]
    },
    {
      id: 3,
      name: 'Sushi Master',
      description: 'Fresh and authentic Japanese cuisine',
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
      cuisine: 'Japanese',
      rating: 4.7,
      deliveryTime: '35-50 min',
      minimumOrder: 20.00,
      foodItems: [
        {
          id: 7,
          name: 'Spicy Tuna Roll',
          description: 'Fresh tuna with spicy sauce and avocado',
          price: 14.99,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        },
        {
          id: 8,
          name: 'Salmon Nigiri',
          description: 'Fresh salmon over seasoned rice',
          price: 12.99,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        },
        {
          id: 9,
          name: 'California Roll',
          description: 'Crab meat, avocado, and cucumber',
          price: 11.99,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        }
      ]
    }
  ];

  constructor() { }

  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (restaurant) {
      return of(restaurant);
    }
    throw new Error('Restaurant not found');
  }
}