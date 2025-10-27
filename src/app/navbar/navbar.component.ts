import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  
  loggedIn$: ReturnType<AuthService['loggedInChanges']>;
  role$: ReturnType<AuthService['roleChanges']>;

  constructor(public authService: AuthService) {
    this.authService.loadFromStorage();
    this.loggedIn$ = this.authService.loggedInChanges();
    this.role$ = this.authService.roleChanges();
  }

  onSignOut() {
    this.authService.signOut();
  }
}