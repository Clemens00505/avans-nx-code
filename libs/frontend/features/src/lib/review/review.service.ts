import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse, IReview } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor(private http: HttpClient) {}

    getBookByIdAsync(id: string): Observable<any> {
        return this.http
            .get<ApiResponse<any>>(environment.dataApiUrl + `/book/${id}`)
            .pipe(map((response) => response.results));
    }

    deleteReviewAsync(reviewId: string, bookId: string): Observable<any> {
        return this.http
            .delete<ApiResponse<any>>(environment.dataApiUrl + `/review/${bookId}/${reviewId}`)
            .pipe(map((response) => response.results));
    }
}