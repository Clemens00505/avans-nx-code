import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../../../backend/user/src';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs: Subscription | null = null; // Allow null to avoid potential runtime errors
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize the form group with validation
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email, // Built-in email validator
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6), // Ensure password length validation
      ]),
    });

    // Check if a user is already logged in
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: User | null) => {
        if (user) {
          console.log('User already logged in. Redirecting to dashboard.');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    // Ensure form is valid before attempting login
    if (this.loginForm.valid) {
      // this.submitted = true; // Disable button or show loading indicator
      // const { email, password } = this.loginForm.value;
      const credentials = {
        emailAddress: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }

      // Call login service
      this.authService.login(credentials.emailAddress, credentials.password).subscribe({
        next: (user) => {
          if (user) {
            console.log('Login successful. Redirecting to dashboard.');
            this.router.navigate(['/']);
          } else {
            console.error('Login failed.');
            console.error('Email:', credentials.emailAddress, 'Password:', credentials.password);
          }
          this.submitted = false; // Re-enable button or hide loading
        },
        error: (err) => {
          console.error('An error occurred during login:', err);
          this.submitted = false;
        },
      });
    } else {
      console.error('Login form is invalid.');
    }
  }
}
