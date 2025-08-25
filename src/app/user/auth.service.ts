import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  signIn(username: string, password: string): boolean {
    // Replace with real authentication logic
    if (username === 'user' && password === 'pass') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  signOut(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}