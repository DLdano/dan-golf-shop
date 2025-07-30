import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from './product.model';
import { ProductService } from './product-service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ProductCardComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error(err),
    });
  }
}