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

        getBookByIdAsync(id: string | null): Observable<IBook> {
                return this.http.get<ApiResponse<any>>(environment.dataApiUrl + `/book/${id}`)
                  .pipe(
                    map((response) => {
                      console.log('Fetched book:', response.results);
                      return response.results;
                    })
                );
        }

        upsertBook(book: IBook): Observable<IBook> {
                console.log('upsertBook aanroepen');
                return this.http
                        .post<ApiResponse<any>>(environment.dataApiUrl + '/book', book)
                        .pipe(map((response) => response.results));
        }

        updateBook(id: string, book: IBook): Observable<IBook> {
                console.log('updateBook aanroepen');
                return this.http
                        .put<ApiResponse<any>>(environment.dataApiUrl + `/book/${id}`, book)
                        .pipe(map((response) => response.results));
        }

        deleteBook(id: string): Observable<IBook> {
                console.log('deleteBook aanroepen');
                return this.http
                        .delete<ApiResponse<any>>(environment.dataApiUrl + `/book/${id}`)
                        .pipe(map((response) => response.results));
        }
}