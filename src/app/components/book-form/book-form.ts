import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.bookId = Number(idParam);
      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue({
            title: book.title,
            author: book.author,
            publishedDate: book.publishedDate.substring(0, 10)
          });
        },
        error: (err) => {
          this.errorMessage = 'Kunde inte hämta boken.';
          console.error(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const bookData = this.bookForm.value;
    const onSaved = () => this.router.navigate(['/books']);
    const onError = (err: unknown) => {
      this.errorMessage = 'Kunde inte spara boken.';
      console.error(err);
    };

    if (this.bookId) {
      this.bookService.updateBook(this.bookId, bookData).subscribe({ next: onSaved, error: onError });
    } else {
      this.bookService.createBook(bookData).subscribe({ next: onSaved, error: onError });
    }
  }
}
