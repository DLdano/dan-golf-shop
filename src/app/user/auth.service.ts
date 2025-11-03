import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private role$ = new BehaviorSubject<string | null>(null);

  signIn(Email: string, Password: string) {
    return this.http.post<{ token: string }>('http://localhost:5208/login', { Email, Password })
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);
          this.loggedIn$.next(true);
          this.role$.next(this.extractRole(response.token));
        })
      );
  }

  private extractRole(token: string): string | null {
    try {
      const payloadPart = token.split('.')[1];
      const json = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
      const claim = json.role ||
        json.roles ||
        json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return Array.isArray(claim) ? claim[0] : claim || null;
    } catch {
      return null;
    }
  }

  loadFromStorage() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.loggedIn$.next(true);
      this.role$.next(this.extractRole(token));
    }
  }

  hasRole(role: string): boolean {
    return this.role$.value === role;
  }

  isLoggedIn(): boolean {
    return this.loggedIn$.value;
  }

  getRole(): string | null {
    return this.role$.value;
  }

  roleChanges() {
    return this.role$.asObservable();
  }

  loggedInChanges() {
    return this.loggedIn$.asObservable();
  }

  signOut(): void {
    localStorage.removeItem('jwt');
    this.loggedIn$.next(false);
    this.role$.next(null);
  }

  private decodePayload(token: string): any | null {
    try {
      const payloadPart = token.split('.')[1];
      const json = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
      return json;
    } catch {
      return null;
    }
  }

  getUserClaims(): { firstName?: string; lastName?: string; email?: string; role?: string | null } {
    const token = localStorage.getItem('jwt');
    if (!token) return {};
    const payload = this.decodePayload(token);
    if (!payload) return {};
    const roleClaim = payload.role ||
      payload.roles ||
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const role = Array.isArray(roleClaim) ? roleClaim[0] : roleClaim || null;
    return {
      firstName: payload.firstName || payload.given_name || payload.givenName,
      lastName: payload.lastName || payload.family_name || payload.familyName,
      email: payload.email || payload.upn || payload.sub,
      role
    };
  }
}