import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';

class MockAuthService {
  loggedIn = false;
  signIn(email: string, password: string) {
    return email === 'ok@example.com' ? of({ token: 't' }) : throwError(() => new Error('bad'));
  }
  isLoggedIn() { return this.loggedIn; }
  signOut() { this.loggedIn = false; }
}

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let component: SignInComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows error on failed login', () => {
    component.username = 'fail@example.com';
    component.password = 'x';
    component.onSignIn();
    expect(component.error).toBe('Invalid credentials');
  });

  it('clears error on success', () => {
    component.username = 'ok@example.com';
    component.password = 'x';
    component.onSignIn();
    expect(component.error).toBe('');
  });
});