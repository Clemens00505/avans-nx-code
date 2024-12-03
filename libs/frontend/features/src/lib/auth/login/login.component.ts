import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
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
  private subs: Subscription[] = [];
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}'),
      ]),
    });

    this.subs.push(
      this.authService.getUserFromLocalStorage().subscribe((user: User | null) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const { email, password } = this.loginForm.value;

      this.subs.push(
        this.authService.login(email, password).subscribe({
          next: (user) => {
            if (user) {
              console.log('Logged in');
              this.router.navigate(['/']);
            }
            this.submitted = false;
          },
          error: (err) => {
            console.error('Login failed:', err);
            this.submitted = false;
          },
        })
      );
    } else {
      console.error('loginForm invalid');
      this.submitted = false;
    }
  }
}
