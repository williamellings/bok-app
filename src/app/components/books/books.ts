import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../../services/book';

@Component({
  selector: 'app-books',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {
  books: Book[] = [];
  errorMessage: string = '';
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Kunde inte hämta böcker.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get filteredBooks(): Book[] {
    if (!this.searchQuery.trim()) {
      return this.books;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.books.filter(b =>
      (b.title && b.title.toLowerCase().includes(query)) ||
      (b.author && b.author.toLowerCase().includes(query))
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
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
