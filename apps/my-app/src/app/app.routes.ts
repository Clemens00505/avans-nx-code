import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from '../../../../libs/frontend/features/src/lib/users/user-list/user-list.component';
import { UserDetailsComponent } from '../../../../libs/frontend/features/src/lib/users/user-details/user-details.component';
import { UserEditComponent } from '../../../../libs/frontend/features/src/lib/users/user-edit/user-edit.component';

export const appRoutes: Route[] = [
    // HIer komen onze URL's te staan
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    

    { path: '**', redirectTo: 'dashboard' }
];
