import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorService } from '../author.service';

@Component({
    selector: 'avans-nx-workshop-author-list',
    templateUrl: './author-list.component.html',
    styles: []
})
export class AuthorListComponent implements OnInit, OnDestroy {
    authors: any[] = [];
    filteredAuthors: any[] = [];
    sub: Subscription = new Subscription();
    searchTerm: string = '';
    errorStatus: Number = 0;

    constructor(private authorService: AuthorService) {
        console.log('AuthorListComponent.constructor() aangeroepen');
    }

    ngOnInit(): void {
        console.log('AuthorListComponent.ngOnInit() aangeroepen');
        this.sub.add(
            this.authorService.getAuthorsAsync().subscribe({
                next: (authors: any) => {
                    this.authors = authors;
                    this.filteredAuthors = authors; // Initially, show all authors
                    console.log('Authors loaded:', authors);
                },
                error: (error: any) => {
                    console.error('Error loading authors:', error);
                    this.errorStatus = error.status;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    deleteAuthor(author: any): void {
        if (author.books?.length === 0) {
            this.sub.add(
                this.authorService.deleteAuthor(author.id).subscribe({
                    next: () => {
                        console.log('Author deleted:', author);
                        this.authors = this.authors.filter((a) => a.id !== author.id);
                        this.filteredAuthors = this.filteredAuthors.filter((a) => a.id !== author.id);
                    },
                    error: (error: any) => {
                        console.error('Error deleting author:', error);
                        this.errorStatus = error.status;
                        alert('Error deleting author');
                    }
                })
            );
        } else {
            console.error('Author has books, cannot delete:', author);
            alert('Author has books, cannot delete');
        }
    }

    searchAuthor(): void {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredAuthors = this.authors.filter((a) =>
            a.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    onSearchChange(): void {
        this.searchAuthor();
    }
}
