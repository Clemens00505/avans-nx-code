import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../book.service';
import { IBook, genre } from '@avans-nx-workshop/shared/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'avans-nx-workshop-book-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NgSelectModule, RouterModule],
    templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit, OnDestroy {
    bookId: string | null = null;
    bookForm!: FormGroup;
    sub: Subscription = new Subscription();
    bookGenres: string[] = Object.values(genre);
    authorNames: string[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService,
        private router: Router
    ) {}

    ngOnInit() {
        this.bookId = this.route.snapshot.paramMap.get('id');
        this.bookForm = this.fb.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            publicationYear: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
            publicator: ['', Validators.required],
            language: ['', Validators.required],
            description: ['', Validators.required],
            coverUrl: ['', Validators.required],
            genre: ['', Validators.required]
        });

        if (this.bookId) {
            this.loadBookDetails();
        }

        this.loadAuthorNames();
    }

    loadBookDetails(): void {
        this.sub = this.bookService.getBookByIdAsync(this.bookId!).subscribe(
            (book: IBook) => {
                this.bookForm.patchValue(book);
            },
            error => {
                console.error('Error loading book:', error);
            }
        );
    }

    loadAuthorNames(): void {
        this.bookService.getAuthorNames().subscribe((names: string[]) => {
            this.authorNames = names;
        });
    }

    onSave(): void {
        if (this.bookForm.valid) {
            const bookData = this.bookForm.value;
            if (this.bookId) {
                this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
                    this.router.navigate(['/books']);
                });
            } else {
                const currentUser = localStorage.getItem('currentuser');
                if (currentUser) {
                    const parsedUser = JSON.parse(currentUser);
                    bookData.creator_id = parsedUser._id;
                } else {
                    console.error('No current user found in local storage');
                }
                console.log('Book created:', bookData);
                this.bookService.upsertBook(bookData).subscribe(() => {
                    this.router.navigate(['/books']);
                });
            }
        } else {
            console.error('Form is invalid:', this.bookForm.errors);
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}