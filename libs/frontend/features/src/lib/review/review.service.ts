import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor(private http: HttpClient) {}

    getReviews(): Observable<any[]> {
        return this.http.get<any[]>('api/reviews'); // Adjust the URL as needed
    }
}