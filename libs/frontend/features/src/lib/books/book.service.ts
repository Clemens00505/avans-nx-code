import { Injectable } from '@angular/core';
import { IBook } from '@avans-nx-workshop/shared/api';
import { delay, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse } from '@avans-nx-workshop/shared/api';

@Injectable({
    providedIn: 'root'
})

export class BookService {
        readonly books?: IBook[]

        constructor(private http: HttpClient) {
                console.log('Service constructor aanroepen');
        }

        getBooksAsync(): Observable<IBook[]> {
                console.log('getBooksAsync() aanroepen');
                return this.http
                        .get<ApiResponse<any>>(environment.dataApiUrl + '/book')
                        .pipe(map((response) => response.results));
        }

        getBookByIdAsync(id: string | null, async: boolean = false): Observable<IBook> {
                console.log('getBookById aanroepen');
                return this.http
                        .get<ApiResponse<any>>(environment.dataApiUrl + `/book/${id}`)
                        .pipe(map((response) => response.results));
        }
}