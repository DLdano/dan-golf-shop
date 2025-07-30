import { Product } from './product.model';

export class ProductData {
    static products: Product[] = [
        { id: 1, name: 'Golf Ball', price: 29.99, category: 'Ball', description: 'High-quality golf balls for better performance', quantity: 100 },
        { id: 2, name: 'Golf Club', price: 199.99, category: 'Club', description: 'Premium golf club for accurate shots', quantity: 50 },
        { id: 3, name: 'Golf Bag', price: 89.99, category: 'Bag', description: 'Durable golf bag with multiple compartments', quantity: 30 }
    ]
}