import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUserInfo[] | undefined = undefined;
  sub: Subscription = new Subscription();

  constructor(private userService: UserService) {
    console.log('UserListComponent.constructor() aangeroepen');
  }

  ngOnInit(): void {
    console.log('UserListComponent.ngOnInit() aangeroepen');
    this.sub.add(
      this.userService.getUsersAsync().subscribe(
        (users) => {
          this.users = users;
          console.log('Users loaded:', users);
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      console.log('Unsubscribing from user service');
      this.sub.unsubscribe();
    }
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted:', userId);
        this.users = this.users?.filter((user) => user._id !== userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}