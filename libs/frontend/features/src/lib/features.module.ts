import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { use } from 'passport';
import { UserService } from './users/user.service';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [UserDetailsComponent, UserListComponent, UserEditComponent],
    exports: [UserDetailsComponent, UserListComponent, UserEditComponent],
    providers: [ UserService ]
})
export class FeaturesModule {}
