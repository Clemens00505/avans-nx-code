import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserDto } from '../../../../../../backend/dto/src';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})

export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subs: Subscription | null = null;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.submitted = true; // Indicate that the form is being submitted
      const { firstname, lastname, email, password } = this.registerForm.value;
  
      const userDto: CreateUserDto = {
        name: `${firstname} ${lastname}`, // Combine first and last name into "name"
        emailAddress: email,
        password,
      };
  
      this.subs = this.authService.register(userDto).subscribe({
        next: (user) => {
          if (user) {
            // Navigate only if user registration was successful
            console.log('Registration successful:', user);
            this.router.navigate(['/']);
          } else {
            // Registration failed, reset submission state
            console.error('Registration failed. API did not return a user.');
            this.submitted = false;
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.submitted = false; // Reset submission state
        },
      });
    } else {
      console.error('Registration form is invalid.');
    }
  }
  
}
