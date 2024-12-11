import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserGender, UserRole } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    standalone: true,
    providers: [UserService],
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserEditComponent implements OnInit, OnDestroy {
    userId: string | null = null;
    userForm!: FormGroup;
    sub: Subscription = new Subscription();
    userGenders: string[] = Object.values(UserGender);
    userRoles: string[] = Object.values(UserRole);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.userForm = this.fb.group({
            profileImgUrl: [''],
            name: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            role: ['', Validators.required],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            isActive: ['', Validators.required]
        });

        this.route.paramMap.subscribe((params: any) => {
            this.userId = params.get('id');
            if (this.userId) {
                this.sub = this.userService.getUserByIdAsync(this.userId).subscribe((user: User) => {
                    this.userForm.patchValue(user);
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave() {
        if (this.userForm.valid) {
            const userData = this.userForm.value;
            if (this.userId) {
                this.userService.updateUser(this.userId, userData).subscribe(() => {
                    this.router.navigate(['/users']);
                });
            } else {
                this.userService.upsertUser(userData).subscribe(() => {
                    this.router.navigate(['/users']);
                });
            }
        } else {
            console.error('Form is invalid:', this.userForm.errors);
        }
    }
}