import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Book } from '@avans-nx-workshop/backend/features';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'avans-nx-workshop-review-list',
    templateUrl: './review-list.component.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
    reviews: any[] = [];
    book: Book | undefined;
review: any;

    constructor(private reviewService: ReviewService) {}

    ngOnInit(): void {
        console.log('ReviewListComponent ngOnInit called');
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        console.log('Book ID: ' + id);

        // Fetch the book and its embedded reviews
        this.reviewService.getBookByIdAsync(id).subscribe((book) => {
            this.book = book;
            this.reviews = book.reviews || [];
            console.log('Reviews: ', this.reviews);
        });
    }

    ngOnDestroy(): void {
        console.log('ReviewListComponent ngOnDestroy called');
    }

    deleteReview(reviewId: string, bookId: string): void {
        console.log('Delete review with ID: ' + reviewId);
        this.reviewService.deleteReviewAsync(bookId, reviewId).subscribe(() => {
            console.log('Review deleted');
            this.reviews = this.reviews.filter((review) => review.id !== reviewId);
        });
    }

}
