import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Book } from '@avans-nx-workshop/backend/features';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-review-list',
    templateUrl: './review-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
    reviews: any[] = [];
    book: Book | undefined;
    review: any;
    user: any;
    userId: string | undefined;

    constructor(private reviewService: ReviewService) {}

    ngOnInit(): void {
        console.log('ReviewListComponent ngOnInit called');
        
        const currentUser = localStorage.getItem('currentuser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            this.userId = user._id;
            console.log('User ID: ' + this.userId);
        } else {
            this.userId = '';
            console.log('No user found in localStorage');
        }
    
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        console.log('Book ID: ' + id);
    
        // Fetch the book and its embedded reviews
        this.reviewService.getBookByIdAsync(id).subscribe((book) => {
            this.book = book;
            this.reviews = book.reviews || [];
            console.log('Book: ', this.book);
            console.log('Reviews: ', this.reviews);
            console.log('User ID in ngOnInit: ', this.userId);
        }, (error) => {
            console.error('Error fetching book: ', error);
        });
    }

    ngOnDestroy(): void {
        console.log('ReviewListComponent ngOnDestroy called');
    }

    deleteReview(bookId: string, reviewId: string): void {
        console.log('Delete review with ID: ' + reviewId);
        console.log('From book with ID: ' + bookId);
        this.reviewService.deleteReviewAsync(bookId, reviewId).subscribe(() => {
            console.log('Review deleted');
            this.ngOnInit();
        });
    }

}
