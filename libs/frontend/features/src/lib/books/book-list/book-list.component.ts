import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { BookService } from '../book.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-book-list',
    templateUrl: './book-list.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule],
    styles: []
})
export class BookListComponent implements OnInit, OnDestroy {
    books: IBook[] | undefined = undefined;
    sub: Subscription = new Subscription();

    constructor(private bookService: BookService) {
        console.log('BookListComponent constructor aanroepen');
    }

    ngOnInit(): void {
        console.log('BookListComponent ngOnInit aanroepen');
        this.sub.add(
            this.bookService.getBooksAsync().subscribe(
                (books) => {
                    this.books = books;
                    console.log('Books loaded:', books);
                },
                (error) => {
                    console.error('Error loading books:', error);
                }
            )
        );
    }

    ngOnDestroy(): void {
        if (this.sub) {
            console.log('Unsubscribing from book service');
            this.sub.unsubscribe();
        }
    }

    deleteBook(bookId: string): void {
        this.bookService.deleteBook(bookId).subscribe(
            () => {
                console.log('Boek verwijderd', bookId);
                this.books = this.books?.filter((book) => book._id !== bookId);
            },
            (error) => {
                console.error('Boek niet verwijderd', error);
            }
        );   
    }
}
