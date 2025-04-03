import { FoodItem } from './food-item.model';

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    cuisine: string;
    deliveryTime: string;
    minimumOrder: number;
    foodItems: FoodItem[];
}