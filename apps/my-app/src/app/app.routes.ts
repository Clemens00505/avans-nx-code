import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from '../../../../libs/frontend/features/src/lib/users/user-list/user-list.component';
import { UserDetailsComponent } from '../../../../libs/frontend/features/src/lib/users/user-details/user-details.component';
import { UserEditComponent } from '../../../../libs/frontend/features/src/lib/users/user-edit/user-edit.component';
import { BookListComponent } from '../../../../libs/frontend/features/src/lib/books/book-list/book-list.component';
import { BookDetailsComponent } from '../../../../libs/frontend/features/src/lib/books/book-details/book-details.component';
import { BookEditComponent } from '../../../../libs/frontend/features/src/lib/books/book-edit/book-edit.component';
import { LoginComponent } from '../../../../libs/frontend/features/src/lib/auth/login/login.component';
import { RegisterComponent } from '../../../../libs/frontend/features/src/lib/auth/register/register.component';
import { ReviewEditComponent } from '../../../../libs/frontend/features/src/lib/review/review-edit/review-edit.component';
import { AuthorListComponent } from '../../../../libs/frontend/features/src/lib/author/author-list/author-list.component';
import { AuthorEditComponent } from '../../../../libs/frontend/features/src/lib/author/author-edit/author-edit.component';
import { AuthorDetailsComponent } from '../../../../libs/frontend/features/src/lib/author/author-details/author-details.component';

export const appRoutes: Route[] = [
    // HIer komen onze URL's te staan
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: BookEditComponent },
    { path: 'books/:id/review', component: ReviewEditComponent },
    { path: 'books/:id/review/:id', component: ReviewEditComponent },
    { path: 'books/:id', component: BookDetailsComponent },
    { path: 'books/:id/edit', component: BookEditComponent },
    { path: 'authors', component: AuthorListComponent },
    { path: 'authors/:id', component: AuthorDetailsComponent },
    { path: 'authors/:id/edit', component: AuthorEditComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    
    { path: '**', redirectTo: 'dashboard' }
];
