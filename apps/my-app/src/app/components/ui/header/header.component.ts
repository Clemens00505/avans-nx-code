import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../../libs/frontend/features/src';
import { User } from '../../../../../../../libs/backend/user/src';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  subs: Subscription | null = null;
  router: Router | null = null;
  isLoggedIn = false;
  user: { name: string; profileImgUrl: string } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to currentUser$ to listen for user state changes
    this.authService.currentUser$.subscribe((user: { name: string; profileImgUrl: string } | null) => {
      this.isLoggedIn = !!user;  // Set isLoggedIn to true when the user exists
      this.user = user;  // Set the user data when logged in, or null when logged out
    });
  }
  

  onLogout(): void {
    this.authService.logout();
  }
}
