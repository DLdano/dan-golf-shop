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
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.extractCategories();
      },
      error: (err) => console.error(err),
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.products.map(p => p.category));
    this.categories = Array.from(uniqueCategories).sort();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }
}