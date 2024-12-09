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
            this.sub = this.bookService.getBookByIdAsync(this.bookId).subscribe(
              (book: IBook) => {
                this.book = book;
                // Initialize 'author' if undefined
                if (!this.book.author) {
                  this.book.author = '';
                }
              },
              error => {
                console.error('Error loading book:', error);
                // Handle any error when fetching book data
              }
            );
          }
        });
      }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave() {
        // Ensure 'author' is not empty before submitting
        if (!this.book.author || this.book.author.trim() === '') {
          console.log('Author is required');
          return;
        }
    
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
}