import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

function buildToken(payload: any) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '');
  return `${header}.${body}.signature`;
}

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  it('signIn sets token and role', () => {
    service.signIn('user@example.com', 'pass').subscribe();
    const req = http.expectOne('http://localhost:5208/login');
    req.flush({ token: buildToken({ email: 'user@example.com', role: 'admin', firstName: 'Dan', lastName: 'Lee' }) });
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getRole()).toBe('admin');
  });

  it('loadFromStorage restores state', () => {
    localStorage.setItem('jwt', buildToken({ role: 'admin' }));
    service.loadFromStorage();
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getRole()).toBe('admin');
  });

  it('signOut clears state', () => {
    localStorage.setItem('jwt', buildToken({ role: 'admin' }));
    service.loadFromStorage();
    service.signOut();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getRole()).toBeNull();
    expect(localStorage.getItem('jwt')).toBeNull();
  });

  it('getUserClaims returns mapped claims', () => {
    localStorage.setItem('jwt', buildToken({
      email: 'u@e.com',
      role: 'admin',
      firstName: 'Dan',
      lastName: 'Lee'
    }));
    const claims = service.getUserClaims();
    expect(claims.email).toBe('u@e.com');
    expect(claims.firstName).toBe('Dan');
    expect(claims.lastName).toBe('Lee');
    expect(claims.role).toBe('admin');
  });

  afterEach(() => http.verify());
});