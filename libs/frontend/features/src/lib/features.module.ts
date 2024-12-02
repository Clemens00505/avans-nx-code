import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { use } from 'passport';
import { UserService } from './users/user.service';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UiModule } from "../../../../share-a-meal/ui/src/lib/ui.module";

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, UiModule],
    declarations: [
        UserDetailsComponent, 
        UserListComponent, 
        UserEditComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [UserDetailsComponent, UserListComponent, UserEditComponent, LoginComponent, RegisterComponent],
    providers: [ UserService, provideHttpClient() ]
})
export class FeaturesModule {}
