import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { IBook } from '@avans-nx-workshop/shared/api';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { genre } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-book-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './book-edit.component.html',
    styleUrl: './book-edit.component.css'
})

export class BookEditComponent implements OnInit, OnDestroy {
    bookId: string | null = null;
    book: IBook = {} as IBook;
    sub: Subscription = new Subscription();
    bookGenres: string[] = Object.values(genre);

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            this.bookId = params.get('id');
            if (this.bookId) {
                this.sub = this.bookService.getBookByIdAsync(this.bookId).subscribe((book: IBook) => {
                    this.book = book;
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave() {
        if (this.bookId) {
            this.bookService.updateBook(this.bookId, this.book).subscribe(() => {
                console.log(this.book);
                this.router.navigate(['/books']);
                console.log('Book updated');
            });
        } else {
            this.bookService.upsertBook(this.book).subscribe(() => {
                console.log(this.book);
                this.router.navigate(['/books']);
                console.log('Book created');
            });
        }
    }
}