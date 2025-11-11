import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../user/auth.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  role$ = new BehaviorSubject<string | null>(null);
  loadFromStorage() {}
  loggedInChanges() { return this.loggedIn$.asObservable(); }
  roleChanges() { return this.role$.asObservable(); }
  signOut() { this.loggedIn$.next(false); this.role$.next(null); }
}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let auth: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavbarComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService) as any;
    fixture.detectChanges();
  });

  it('shows Sign In when logged out', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="/signin"]');
    expect(link).toBeTruthy();
  });

  it('shows Account when logged in', () => {
    auth.loggedIn$.next(true);
    fixture.detectChanges();
    const account = fixture.nativeElement.querySelector('a[routerLink="/account"]');
    expect(account).toBeTruthy();
  });

  it('shows Admin when role=admin', () => {
    auth.loggedIn$.next(true);
    auth.role$.next('admin');
    fixture.detectChanges();
    const admin = fixture.nativeElement.querySelector('a[routerLink="/admin"]');
    expect(admin).toBeTruthy();
  });
});