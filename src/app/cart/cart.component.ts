import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html'
})

export class CartComponent {
  cart: Product[] = [];
}