import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';

@Component({
    selector: 'avans-nx-workshop-review-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './review-edit.component.html',
    styleUrl: './review-edit.component.css'
})
export class ReviewEditComponent implements OnInit {
    book: any;
    review: any;
    reviewForm: FormGroup | undefined;
    user: any;

    constructor(
        private route: ActivatedRoute,
        private reviewService: ReviewService,
        private router: Router,
        private fb: FormBuilder
    ) {
        const userString = localStorage.getItem('currentuser');
        console.log('UserString: ', userString);
        if (userString) {
            this.user = JSON.parse(userString);
        } else {
            console.error('User is not available');
        }
    }

    ngOnInit(): void {
        console.log('ReviewEditComponent ngOnInit called');
        this.reviewForm = this.fb.group({
            rating: [''],
            title: [''],
            comment: ['']
        });

        this.route.paramMap.subscribe((params: any) => {
            const reviewId = params.get('reviewId');
            // get bookId from url route
            const url = window.location.href;
            const bookId = url.split('/')[4];
            console.log('Review ID: ' + reviewId);
            console.log('Book ID: ' + bookId);
            if (bookId) {
                this.reviewService.getBookByIdAsync(bookId).subscribe((book) => {
                    this.book = book;
                    console.log('Book: ', this.book);
                });
            }
            if (reviewId) {
                this.reviewService.getReviewByIdAsync(reviewId).subscribe((review) => {
                    this.review = review;
                    console.log('Review: ', this.review);
                    this.reviewForm?.patchValue(this.review);
                });
            }
        });
    }

    ngOnDestroy(): void {
        console.log('ReviewEditComponent ngOnDestroy called');
    }

    onSubmit(): void {
        console.log('ReviewEditComponent onSubmit called');
        console.log('ReviewForm: ', this.reviewForm?.value);
        console.log('Book: ', this.book);
        console.log('User: ', this.user);

        if (this.book && this.book._id && this.user) {
            const reviewData = {
                ...this.reviewForm?.value,
                user: {
                    userId: this.user._id,
                    name: this.user.name
                },
                bookId: this.book._id,
                dateAndTime: new Date().toISOString()
            };
            this.reviewService.postReviewAsync(reviewData).subscribe(() => {
                console.log('Review updated');
                this.router.navigate(['/books']);
            });
        } else {
            console.error('Book ID or User is not available or missing required fields');

            if (!this.book) {
                console.error('Book is not available');
            } else if (!this.book._id) {
                console.error('Book ID is missing');
            }
            if (!this.user) {
                console.error('User is not available');
            } else {
                if (!this.user._id) {
                    console.error('User ID is missing');
                }
                if (!this.user.name) {
                    console.error('User name is missing');
                }
            }
        }
    }
}