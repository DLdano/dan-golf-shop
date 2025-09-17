import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [NgClass, CommonModule],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: any;
  cartService = inject(CartService);
  isAddedToCart: boolean = false;
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.cartService.cart$.subscribe(cart => {
      this.isAddedToCart = cart.some(item => item.id === this.product.id);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}