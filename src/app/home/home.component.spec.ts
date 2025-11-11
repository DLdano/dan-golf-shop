import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // If HomeComponent is standalone use imports; if not, switch to declarations.
      imports: [HomeComponent]
      // declarations: [HomeComponent]
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('creates component', () => {
    const fixture = create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders main heading', () => {
    const fixture = create();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain("Dan's Golf Shop");
  });

  it('renders description paragraph', () => {
    const fixture = create();
    const p = fixture.nativeElement.querySelector('p.home-description');
    expect(p).toBeTruthy();
    expect(p.textContent).toContain('one-stop shop');
  });

  it('renders featured products section heading', () => {
    const fixture = create();
    const h2s = Array.from(fixture.nativeElement.querySelectorAll('section.featured-products h2'));
    expect(h2s.length).toBeGreaterThan(0);
    expect((h2s[0] as HTMLElement).textContent).toContain('Featured Products');
  });

  it('has three product-card elements (placeholders count)', () => {
    const fixture = create();
    const cards = fixture.nativeElement.querySelectorAll('.product-card');
    expect(cards.length).toBe(3);
  });

  it('renders about list with 3 items', () => {
    const fixture = create();
    const items = fixture.nativeElement.querySelectorAll('section.about ul li');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Top brands');
  });

  it('basic snapshot contains sections', () => {
    const fixture = create();
    const html = fixture.nativeElement.innerHTML;
    expect(html).toContain('Featured Products');
    expect(html).toContain('Why Shop With Us?');
  });
});