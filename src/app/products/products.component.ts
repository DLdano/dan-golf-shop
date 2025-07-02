import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ProductCardComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products = [
    { name: 'Golf Club Set', description: 'Complete set for beginners', price: 299 },
    { name: 'Pro Golf Balls (12-pack)', description: 'High-performance balls', price: 49 },
    { name: 'Golf Glove', description: 'Comfortable and durable', price: 19 },
  ];
}