import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
    selector: 'avans-nx-workshop-review-list',
    templateUrl: './review-list.component.html',
    standalone: true,
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
    reviews: any[] = [];

    constructor(private reviewService: ReviewService) {}

    ngOnInit(): void {
        this.reviewService.getReviews().subscribe((reviews: any[]) => {
            this.reviews = reviews;
        });
    }
}