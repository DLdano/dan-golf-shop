import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../products/product.model';

describe('CartService', () => {
  let service: CartService;
  const A: Product = { id: 1, name: 'Driver', price: 100, description: 'Driver', category: 'Drivers', quantity: 1 };
  const B: Product = { id: 2, name: 'Putter', price: 50, description: 'Putter', category: 'Putters', quantity: 1 };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CartService] });
    service = TestBed.inject(CartService);
  });

  it('adds item', () => {
    service.addToCart(A);
    expect(service.getCart().length).toBe(1);
  });

  it('removes item', () => {
    service.addToCart(A);
    service.addToCart(B);
    service.removeFromCart(1);
    expect(service.getCart().map(i => i.id)).toEqual([2]);
  });
});