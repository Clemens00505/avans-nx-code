import { Injectable } from '@angular/core';
import { IAuthor } from '@avans-nx-workshop/shared/api';
import { delay, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse } from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})
  
export class AuthorService {
    readonly authors?: IAuthor[]

    constructor(private http: HttpClient) {
        console.log('Service constructor aanroepen');
    }

    getAuthorsAsync(): Observable<IAuthor[]> {
        console.log('getAuthorsAsync() aanroepen');
        return this.http
            .get<ApiResponse<any>>(environment.dataApiUrl + '/author')
            .pipe(map((response) => response.results));
    }

    getAuthorByIdAsync(id: string | null): Observable<IAuthor> {
        return this.http.get<ApiResponse<any>>(environment.dataApiUrl + `/author/${id}`)
            .pipe(
                map((response) => {
                    console.log('Fetched author:', response.results);
                    return response.results;
                })
            );
    }

    updateAuthor(id: string, author: IAuthor): Observable<IAuthor> {
        console.log('updateAuthor aanroepen');
        return this.http
            .put<ApiResponse<any>>(environment.dataApiUrl + `/author/${id}`, author)
            .pipe(map((response) => response.results));
    }

    deleteAuthor(id: string): Observable<IAuthor> {
        console.log('deleteAuthor aanroepen');
        return this.http
            .delete<ApiResponse<any>>(environment.dataApiUrl + `/author/${id}`)
            .pipe(map((response) => response.results));
    }
}