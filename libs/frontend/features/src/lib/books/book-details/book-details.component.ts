import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { IBook } from '@avans-nx-workshop/shared/api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewListComponent } from '../../review/review-list/review-list.component';




@Component({

    selector: 'app-book-details',
  
    templateUrl: './book-details.component.html',
  
    standalone: true,
  
    imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ReviewListComponent
    ]
})

export class BookDetailsComponent implements OnInit {
    bookId: string | null = null;
    book: IBook | undefined;
    sub: Subscription = new Subscription();
    currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');

    constructor(
        private route: ActivatedRoute, 
        private bookService: BookService
    ) 
    {
        console.log('BookDetailsComponent constructor aanroepen');
    }

    ngOnInit(): void {
        console.log('BookDetailsComponent ngOnInit aanroepen');
        this.route.paramMap.subscribe(params => {
            this.bookId = params.get('id');
            if (this.bookId) {
                this.sub = this.bookService.getBookByIdAsync(this.bookId).subscribe((book: IBook) => {
                    this.book = book;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
