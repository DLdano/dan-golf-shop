import { Component } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Product } from '../products/product.model';

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] 
})
export class CartComponent {
  cart: CartItem[] = [
    // Example items for demonstration; replace with real cart logic or service
    // { id: 1, name: 'Pro Series Driver', price: 299.99, quantity: 1 },
    // { id: 2, name: 'Precision Putter', price: 149.99, quantity: 2 }
  ];

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(i => i !== item);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    // Implement checkout logic here
    alert('Checkout not implemented.');
  }
}