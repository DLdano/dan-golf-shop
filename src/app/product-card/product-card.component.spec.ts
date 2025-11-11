import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { CartService } from '../cart/cart.service';
import { Product } from '../products/product.model';
import { of, BehaviorSubject } from 'rxjs';

class MockCartService {
  added: Product[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  
  // Provide all methods/properties the component subscribes to
  cart$ = this.cartSubject.asObservable();
  
  getCart() {
    return of([]);
  }
  
  addToCart(p: Product) { 
    this.added.push(p); 
  }

  // Add any other methods your component calls
  removeFromCart(id: number) {}
}

describe('ProductCardComponent (standalone)', () => {
  let fixture: ComponentFixture<ProductCardComponent>;
  let component: ProductCardComponent;
  let cart: MockCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    cart = TestBed.inject(CartService) as any;
    component.product = { id: 7, name: 'Ball', price: 12, description: 'Tour ball' } as Product;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders product name', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain('Ball');
  });

  it('calls cart service on addToCart', () => {
    component.addToCart();
    expect(cart.added.length).toBe(1);
    expect(cart.added[0].id).toBe(7);
  });
});