import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';

class MockCartService {
  private items: any[] = [];
  getCart() { return this.items; }
  addItem(p: any) { this.items.push({ ...p, quantity: 1 }); }
  removeFromCart(id: number) { this.items = this.items.filter(i => i.id !== id); }
}

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;
  let service: MockCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CartService) as any;
    service.addItem({ id: 1, name: 'Driver', price: 100 });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('renders cart items', () => {
    const li = fixture.nativeElement.querySelector('li');
    expect(li.textContent).toContain('Driver');
  });

  it('computes total', () => {
    expect(component.getTotal()).toBe(100);
  });

  it('removes item', () => {
    component.removeFromCart(1);
    fixture.detectChanges();
    expect(component.cart.length).toBe(0);
  });
});