import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  getCart(): Product[] {
    return this.cartSubject.getValue();
  }

  addToCart(product: Product): void {
    const currentCart = this.getCart();
    if (!currentCart.find(item => item.id === product.id)) {
      this.cartSubject.next([...currentCart, product])
    }
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.getCart().filter(item => item.id !== productId);
    this.cartSubject.next(updatedCart);
  }
}
