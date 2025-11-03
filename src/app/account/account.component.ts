import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  claims: { firstName?: string; lastName?: string; email?: string } = {};

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.claims = this.auth.getUserClaims();
  }
}
