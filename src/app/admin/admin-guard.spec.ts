import { TestBed } from '@angular/core/testing';
import { adminGuard } from './admin-guard';
import { AuthService } from '../user/auth.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthService {
  loggedIn = false;
  role: string | null = null;
  isLoggedIn() { return this.loggedIn; }
  hasRole(r: string) { return this.role === r; }
}

describe('adminGuard (functional)', () => {
  let auth: MockAuthService;
  let router: Router;
  const route = new ActivatedRouteSnapshot();
  const state = { url: '/admin' } as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
    auth = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router);
  });

  function runGuard() {
    let result: any;
    TestBed.runInInjectionContext(() => {
      result = adminGuard(route, state);
    });
    return result;
  }

  it('allows admin', () => {
    auth.loggedIn = true;
    auth.role = 'admin';
    const navigateSpy = spyOn(router, 'navigate');
    const res = runGuard();
    expect(res).toBeTrue();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('blocks non-admin', () => {
    auth.loggedIn = true;
    auth.role = 'user';
    const navigateSpy = spyOn(router, 'navigate');
    const res = runGuard();
    expect(res).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('blocks anonymous', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const res = runGuard();
    expect(res).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});