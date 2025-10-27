import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  username = '';
  password = '';
  error = '';

  constructor(public auth: AuthService) {}

  onSignIn() {
     this.auth.signIn(this.username, this.password).subscribe({
      next: (response: any) => {
        this.error = '';
        console.log('Login successful', response);
      },
      error: (err: any) => {
        this.error = 'Invalid credentials';
        console.error('Login failed', err);
      }
    });
  }

  onSignOut() {
    this.auth.signOut();
    this.username = '';
    this.password = '';
  }
}