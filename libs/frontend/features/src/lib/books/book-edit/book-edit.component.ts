import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { IBook } from '@avans-nx-workshop/shared/api';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { genre } from '@avans-nx-workshop/shared/api';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'avans-nx-workshop-book-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, NgSelectModule],
    templateUrl: './book-edit.component.html',
    styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit, OnDestroy {
    bookId: string | null = null;
    book: IBook = {} as IBook;
    sub: Subscription = new Subscription();
    bookGenres: string[] = Object.values(genre);
    authorNames: string[] = [];
    selectedAuthor: string = '';
    selectedGenre: string = '';

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            this.bookId = params.get('id');
            if (this.bookId) {
                this.sub = this.bookService.getBookByIdAsync(this.bookId).subscribe(
                    (book: IBook) => {
                        this.book = book;
                        this.selectedAuthor = this.book.author || '';
                        this.selectedGenre = this.book.genre || '';
                    },
                    error => {
                        console.error('Error loading book:', error);
                    }
                );
            }
        });

        // Load author names
        this.loadAuthorNames();
    }

    loadAuthorNames(): void {
        this.bookService.getAuthorNames().subscribe((names: string[]) => {
            this.authorNames = names;
        });
    }

    onSave(): void {
        // Ensure 'author' is not empty before submitting
        if (!this.selectedAuthor || this.selectedAuthor.trim() === '') {
            console.log('Author is required');
            return;
        }

        // Ensure 'genre' is not empty before submitting
        if (!this.selectedGenre || this.selectedGenre.trim() === '') {
          console.log('Genre is required');
          return;
        }

        this.book.author = this.selectedAuthor;
        this.book.genre = this.selectedGenre as genre;

        if (this.bookId) {
            this.bookService.updateBook(this.bookId, this.book).subscribe(() => {
                console.log('Book updated', this.book);
                this.router.navigate(['/books']);
            });
        } else {
            this.bookService.upsertBook(this.book).subscribe(() => {
                console.log('Book created', this.book);
                this.router.navigate(['/books']);
            });
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}