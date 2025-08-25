import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html'
  
})
export class SignInComponent {
  username = '';
  password = '';
  error = '';

  constructor(public auth: AuthService) {}

  onSignIn() {
    if (!this.auth.signIn(this.username, this.password)) {
      this.error = 'Invalid credentials';
    } else {
      this.error = '';
    }
  }

  onSignOut() {
    this.auth.signOut();
    this.username = '';
    this.password = '';
  }
}