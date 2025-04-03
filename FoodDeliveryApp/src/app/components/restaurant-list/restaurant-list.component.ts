import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;
  error: string | null = null;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load restaurants. Please try again later.';
        this.loading = false;
        console.error('Error loading restaurants:', error);
      }
    });
  }

  getRatingStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}