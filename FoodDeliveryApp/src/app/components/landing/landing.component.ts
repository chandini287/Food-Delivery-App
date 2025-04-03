import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  features = [
    {
      icon: 'fa-clock',
      title: 'Fast Delivery',
      description: 'Get your food delivered quickly and hot, right to your doorstep'
    },
    {
      icon: 'fa-utensils',
      title: 'Best Quality',
      description: 'Order from top-rated restaurants with verified quality standards'
    },
    {
      icon: 'fa-motorcycle',
      title: 'Live Tracking',
      description: 'Track your order in real-time with our advanced delivery system'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Secure Payment',
      description: 'Multiple payment options with secure transaction processing'
    }
  ];

  steps = [
    {
      number: '1',
      title: 'Choose Restaurant',
      description: 'Browse through our curated list of restaurants'
    },
    {
      number: '2',
      title: 'Select Food',
      description: 'Choose from a wide variety of delicious dishes'
    },
    {
      number: '3',
      title: 'Place Order',
      description: 'Pay securely and track your order in real-time'
    }
  ];
} 