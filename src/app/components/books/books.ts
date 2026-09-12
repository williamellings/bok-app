import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService, Book } from '../../services/book';

@Component({
  selector: 'app-books',
  imports: [CommonModule, RouterLink],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {
  books: Book[] = [];
  errorMessage: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errorMessage = 'Kunde inte hämta böcker.';
        console.error(err);
      }
    });
  }

  deleteBook(id: number): void {
    if (!confirm('Är du säker på att du vill radera denna bok?')) {
      return;
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: (err) => console.error(err)
    });
  }
}
