import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '@avans-nx-workshop/backend/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})

export class UserDetailsComponent implements OnInit {
    userId: string | null = null;
    user: User | undefined;
    sub: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
            if (this.userId) {
                this.sub = this.userService.getUserByIdAsync(this.userId).subscribe(user => {
                    this.user = user;
                });
            }
        });
    }
}
