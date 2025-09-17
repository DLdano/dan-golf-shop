import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { CartItem } from './cartItem.model';
import { Product } from '../products/product.model';
import { CartService } from './cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] 
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  cartService = inject(CartService);

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}