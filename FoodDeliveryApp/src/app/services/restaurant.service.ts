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
      minimumOrder: 100,
      foodItems: [
        {
          id: 1,
          name: 'Margherita Pizza',
          description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
          price: 399,
          imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60',
          restaurantId: 1
        },
        {
          id: 2,
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni with melted cheese',
          price: 499,
          imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60',
          restaurantId: 1
        },
        {
          id: 3,
          name: 'Vegetarian Pizza',
          description: 'Bell peppers, mushrooms, onions, and olives',
          price: 449,
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
      minimumOrder: 100,
      foodItems: [
        {
          id: 4,
          name: 'Classic Burger',
          description: 'Beef patty with lettuce, tomato, and special sauce',
          price: 299,
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
          restaurantId: 2
        },
        {
          id: 5,
          name: 'Cheese Burger',
          description: 'Classic burger with melted cheddar cheese',
          price: 349,
          imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60',
          restaurantId: 2
        },
        {
          id: 6,
          name: 'Bacon Burger',
          description: 'Classic burger with crispy bacon strips',
          price: 399,
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
      minimumOrder: 100,
      foodItems: [
        {
          id: 7,
          name: 'Spicy Tuna Roll',
          description: 'Fresh tuna with spicy sauce and avocado',
          price: 499,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        },
        {
          id: 8,
          name: 'Salmon Nigiri',
          description: 'Fresh salmon over seasoned rice',
          price: 449,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        },
        {
          id: 9,
          name: 'California Roll',
          description: 'Crab meat, avocado, and cucumber',
          price: 399,
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
          restaurantId: 3
        }
      ]
    },
    {
      id: 4,
      name: 'Tandoori Express',
      description: 'Authentic North Indian cuisine with traditional tandoor dishes',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuZG9vcml8ZW58MHx8MHx8fDA%3D',
      cuisine: 'Indian',
      rating: 4.8,
      deliveryTime: '30-45 min',
      minimumOrder: 100,
      foodItems: [
        {
          id: 10,
          name: 'Butter Chicken',
          description: 'Tender chicken in rich tomato and butter sauce',
          price: 599,
          imageUrl: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D',
          restaurantId: 4
        },
        {
          id: 11,
          name: 'Tandoori Chicken',
          description: 'Marinated chicken cooked in traditional clay oven',
          price: 549,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1695931844305-b5dd90ab6138?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFRhbmRvb3JpJTIwQ2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D',
          restaurantId: 4
        },
        {
          id: 12,
          name: 'Garlic Naan',
          description: 'Freshly baked flatbread with garlic butter',
          price: 99,
          imageUrl: 'https://media.istockphoto.com/id/893029766/photo/garlic-and-coriander-naan-served-in-a-plate-its-a-type-of-indian-bread-or-roti-flavoured-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=GOsD-H3zuT_hq4R8mZn6IpY9zLmaKY2Ie2Z3SQ3k-8Y=',
          restaurantId: 4
        },
        {
          id: 13,
          name: 'Vegetable Biryani',
          description: 'Fragrant basmati rice with mixed vegetables and spices',
          price: 449,
          imageUrl: 'https://media.istockphoto.com/id/1437118818/photo/biryani-with-salan-raita-and-pickle.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ayrkt_l2Ukw0A_kTM7QKEKm48fiYSMtvZBmjE11eTk=',
          restaurantId: 4
        }
      ]
    },
    {
      id: 5,
      name: 'South Indian Delight',
      description: 'Traditional South Indian cuisine with authentic flavors',
      imageUrl: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U291dGglMjBJbmRpYW4lMjBEZWxpZ2h0fGVufDB8fDB8fHww',
      cuisine: 'Indian',
      rating: 4.6,
      deliveryTime: '25-40 min',
      minimumOrder: 100,
      foodItems: [
        {
          id: 14,
          name: 'Masala Dosa',
          description: 'Crispy rice crepe with spiced potato filling',
          price: 299,
          imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFzYWxhJTIwRG9zYXxlbnwwfHwwfHx8MA%3D%3D',
          restaurantId: 5
        },
        {
          id: 15,
          name: 'Idli Sambar',
          description: 'Steamed rice cakes with lentil stew',
          price: 249,
          imageUrl: 'https://media.istockphoto.com/id/1016644444/photo/idli-with-sambhar-and-chutney-in-bowl.jpg?s=612x612&w=0&k=20&c=p-SHnH7GY8Pieupqozcp0Ql9IgzLtdmapMUfV5-5p8g=',
          restaurantId: 5
        },
        {
          id: 16,
          name: 'Vada',
          description: 'Crispy fried lentil donuts',
          price: 199,
          imageUrl: 'https://media.istockphoto.com/id/1098330274/photo/sambar-vada-or-vadai-a-popular-south-indian-food.jpg?s=612x612&w=0&k=20&c=TjW2wBVmwnA_h_MsPEzkZSjwsTvOLADMdV11VYn_yfc=',
          restaurantId: 5
        },
        {
          id: 17,
          name: 'Filter Coffee',
          description: 'Traditional South Indian filter coffee',
          price: 99,
          imageUrl: 'https://media.istockphoto.com/id/1426307970/photo/south-indian-filter-coffee-served-in-a-traditional-tumbler-or-cup-over-roasted-raw-beans.webp?a=1&b=1&s=612x612&w=0&k=20&c=b5QJMT3HFaNLvZqm_FBVIQJGOTaoxOqcdfeIZ2hQLy8=',
          restaurantId: 5
        }
      ]
    },
    {
      id: 6,
      name: 'Punjabi Dhaba',
      description: 'Authentic Punjabi cuisine with rich flavors',
      imageUrl: 'https://media.istockphoto.com/id/1437118778/photo/indian-food-flatlay.webp?a=1&b=1&s=612x612&w=0&k=20&c=NqS50-uFUWKl5mkH4t9n0CDsGAwWfl2pyXf16nBPV5k=',
      cuisine: 'Indian',
      rating: 4.7,
      deliveryTime: '35-50 min',
      minimumOrder: 100,
      foodItems: [
        {
          id: 18,
          name: 'Dal Makhani',
          description: 'Creamy black lentils cooked with butter and spices',
          price: 399,
          imageUrl: 'https://media.istockphoto.com/id/1170374719/photo/dal-makhani-at-dark-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=FWHhW6SnrLvmwaR-APN3pIxEjLJe073-PQ0cfvOGoTI=',
          restaurantId: 6
        },
        {
          id: 19,
          name: 'Paneer Tikka',
          description: 'Marinated cottage cheese grilled to perfection',
          price: 449,
          imageUrl: 'https://media.istockphoto.com/id/1474136049/photo/close-up-image-of-paneer-kebabs-marinated-curd-cheese-pieces-on-metal-skewers-red-onion-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=cvfV2qr33X-FNf0E4GCYnVovx3w7DdXmyIxv4EuMLII=',
          restaurantId: 6
        },
        {
          id: 20,
          name: 'Amritsari Kulcha',
          description: 'Stuffed bread with spiced potato filling',
          price: 199,
          imageUrl: 'https://media.istockphoto.com/id/1388250623/photo/indian-tandoori-naan-bread-also-called-amritsari-tanduri-nan-kulcha-bread-cooked-in-hot-oven.jpg?s=612x612&w=0&k=20&c=ud3OA8iH8b_-W7xo5JN68udVLO4XBRsAQsf2M4wGE3k=',
          restaurantId: 6
        },
        {
          id: 21,
          name: 'Lassi',
          description: 'Sweet yogurt drink with cardamom',
          price: 149,
          imageUrl: 'https://media.istockphoto.com/id/658835556/photo/lassi-is-a-popular-traditional-yogurt-based-drink.jpg?s=612x612&w=0&k=20&c=4gKv5qoOXI3wM38FrUDaPZmXCZSHC7WFBo0ePKY3vUE=',
          restaurantId: 6
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
