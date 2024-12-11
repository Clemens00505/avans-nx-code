import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html'
})
export class AuthorEditComponent implements OnInit {
  authorForm!: FormGroup;
  authorId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id')!;
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      bio: ['', Validators.required],
      photo: ['', Validators.required]
    });

    this.loadAuthorDetails();
  }

  loadAuthorDetails(): void {
    this.authorService.getAuthorByIdAsync(this.authorId).subscribe((author) => {
        // Set form values and convert birthDate to a Date object
        if (author.birthDate) {
            const date = new Date(author.birthDate);
            (author as any).birthDate = date.toISOString().split('T')[0];
        }
      this.authorForm.patchValue(author);
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
        console.log('Form is valid:', this.authorForm.value);
        const authorData = this.authorForm.value;
        this.authorService.updateAuthor(this.authorId, authorData).subscribe(
            () => {
                this.router.navigate(['/authors']);
            },
            (error) => {
                console.error('Error updating author:', error);
            }
        );
    } else {
        console.error('Form is invalid:', this.authorForm.errors);
        console.log(this.authorForm.value);
        console.log(this.authorForm);
    }
  }
}