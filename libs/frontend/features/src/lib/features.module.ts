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
import { ReviewService } from './review/review.service';
import { BookService } from './books/book.service';
import { AuthorService } from './author/author.service';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorDetailsComponent } from './author/author-details/author-details.component';
import { Author } from '@avans-nx-workshop/backend/features';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, UiModule],
    declarations: [
        UserDetailsComponent, 
        UserListComponent, 
        LoginComponent,
        RegisterComponent,
        AuthorListComponent,
        AuthorDetailsComponent,
        AuthorEditComponent
    ],
    exports: [UserDetailsComponent, UserListComponent, LoginComponent, RegisterComponent, AuthorListComponent, AuthorDetailsComponent, AuthorEditComponent],
    providers: [ UserService, ReviewService, BookService, AuthorService, provideHttpClient() ]
})
export class FeaturesModule {}
