import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: any;
}