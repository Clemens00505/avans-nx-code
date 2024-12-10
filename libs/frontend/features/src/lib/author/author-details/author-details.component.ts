import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuthor } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { Book } from '@avans-nx-workshop/backend/features';

@Component({
    selector: 'avans-nx-workshop-author-details',
    templateUrl: './author-details.component.html'
})
export class AuthorDetailsComponent {
    authorId: string | null = null;
    author: IAuthor | undefined;
    sub: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private authorService: AuthorService
    ) {}

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.authorId = params.get('id');
            if (this.authorId) {
                this.sub = this.authorService.getAuthorByIdAsync(this.authorId).subscribe(author => {
                    this.author = author;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
