import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthorService } from '../author.service';

@Component({
    selector: 'avans-nx-workshop-author-list',
    templateUrl: './author-list.component.html',
    styles: []
})

export class AuthorListComponent implements OnInit, OnDestroy {
    authors: any[] = [];
    sub: Subscription = new Subscription()

    constructor(
        private http: HttpClient,
        private authService: AuthorService
    ) {
        console.log('UserListComponent.constructor() aangeroepen');
    }

    ngOnInit() {
        console.log('UserListComponent.ngOnInit() aangeroepen');
        this.sub.add(
            this.authService.getAuthorsAsync().subscribe(
                (authors) => {
                    this.authors = authors;
                    console.log('Authors loaded:', authors);
                },
                (error) => {
                    console.error('Error loading authors:', error);
                }
            )
        );
        
    }

    ngOnDestroy() {
    }
}