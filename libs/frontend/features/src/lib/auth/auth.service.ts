import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../../../../backend/user/src';
import { IUser, IUserIdentity } from '../../../../../shared/api/src';
import { Router } from '@angular/router';
import { environment } from '../../../../../shared/util-env/src';	
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { AlertService, AlertType } from '../../../../../share-a-meal/ui/src';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserDto } from '../../../../../backend/dto/src';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUserIdentity | null>(null);
  private readonly CURRENT_USER = 'currentuser';
  private readonly TOKEN_KEY = 'token';


  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Load the user from localStorage on service initialization
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: User | null) => {
          if (user) {
            console.log('User found in localStorage.');
            this.currentUser$.next(user);
            return this.validateToken();
          } else {
            console.log('No user found in localStorage.');
            return of(null);
          }
        })
      )
      .subscribe(() => console.log('Startup authentication completed.'));
  }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  login(emailAddress: string, password: string): Observable<IUserIdentity | null> {
    console.log(`login at ${environment.dataApiUrl}/auth/login`);
  
    return this.http
      .post<{ results: { _id: string; token: string; name: string; emailAddress: string; profileImgUrl: string } }>(
        `${environment.dataApiUrl}/auth/login`,
        { emailAddress, password },
        { headers: this.headers }
      )
      .pipe(
        map((response) => {
          console.log('API Response:', response);
          const { _id, token, name, emailAddress, profileImgUrl } = response.results;
  
          if (!token || !name || !emailAddress) {
            throw new Error('Token or user details missing from response');
          }
  
          const user: IUserIdentity = {
            _id,
            name,
            emailAddress: emailAddress,
            profileImgUrl,
          };
  
          this.saveUserToLocalStorage(user, token);
          this.currentUser$.next(user);
  
          this.alertService.showAlert({
            type: AlertType.Success,
            message: 'You have been logged in',
            visible: true,
          });
  
          return user;
        }),
        catchError((error: any) => {
          console.error('Login failed:', error);
          this.alertService.showAlert({
            type: AlertType.Error,
            message: error.error?.message || error.message,
            visible: true,
          });
          return of(null);
        })
      );
  }
  

  register(dto: CreateUserDto): Observable<User | null> {
    return this.http
      .post<{ results: User & { token: string } }>(
        `${environment.dataApiUrl}/auth/register`,
        dto
      )
      .pipe(
        map((response) => {
          const { results } = response;
          const { token, ...user } = results;
  
          console.log('User and token:', user, token);
  
          // Save user and token to localStorage
          this.saveUserToLocalStorage(user as User, token);
  
          // Update the current user
          this.currentUser$.next(user as User);
  
          // Show a success alert
          this.alertService.showAlert({
            type: AlertType.Success,
            message: 'Registration successful. You are now logged in.',
            visible: true,
          });
  
          console.log('Registration successful:', user, token);
          return user as User;
        }),
        catchError((error: any) => {
          console.error('Registration error:', error);
  
          // Show an error alert
          this.alertService.showAlert({
            type: AlertType.Error,
            message: error.error?.message || 'Registration failed.',
            visible: true,
          });
  
          // Pass null back to the caller to indicate failure
          return of(null);
        })
      );
  }
  

  validateToken(): Observable<User | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      this.logout();
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<User>(`${environment.dataApiUrl}/auth/profile`, httpOptions).pipe(
      tap((validatedUser) => {
        console.log('Token is valid.');
        this.currentUser$.next(validatedUser);
      }),
      catchError((error) => {
        console.error('Token validation failed:', error);
        this.logout();
        return of(null);
      })
    );
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem(this.CURRENT_USER);
    localStorage.removeItem(this.TOKEN_KEY);  // Ensure both user and token are removed
    
    this.currentUser$.next(null);  // Reset the current user observable to null
    
    this.router.navigate(['/login']).then((success) => {
      if (success) {
        console.log('Logged out successfully.');
        this.alertService.showAlert({
          type: AlertType.Success,
          message: 'You have been logged out',
          visible: true,
        });
      } else {
        console.error('Logout navigation failed.');
      }
    });
  }

  getUserFromLocalStorage(): Observable<User | null> {
    const userJson = localStorage.getItem(this.CURRENT_USER);
    if (!userJson) {
        return of(null);
    }
    try {
        const user: IUser = JSON.parse(userJson);
        return of(user);
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return of(null);
    }
  }

  saveUserToLocalStorage(user: IUserIdentity, token: string): void {
    if (!user || !token) {
      console.error('User or token is undefined');
      return;
    }
  
    localStorage.setItem('currentuser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }
  

  userMayEdit(itemUserId: number): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => (user ? user._id === itemUserId.toString() : false))
    );
  }
}
