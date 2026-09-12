import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService, Quote } from '../../services/quote';

@Component({
  selector: 'app-quotes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css'
})
export class Quotes implements OnInit {
  quotes: Quote[] = [];
  errorMessage: string = '';
  quoteForm: FormGroup;
  editingQuoteId: number | null = null;

  constructor(
    private quoteService: QuoteService,
    private fb: FormBuilder
  ) {
    this.quoteForm = this.fb.group({
      text: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: (err) => {
        this.errorMessage = 'Kunde inte hämta citat.';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      return;
    }

    const quoteData = this.quoteForm.value;

    if (this.editingQuoteId) {
      this.quoteService.updateQuote(this.editingQuoteId, quoteData).subscribe({
        next: () => {
          this.resetForm();
          this.loadQuotes();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.quoteService.createQuote(quoteData).subscribe({
        next: () => {
          this.resetForm();
          this.loadQuotes();
        },
        error: (err) => console.error(err)
      });
    }
  }

  editQuote(quote: Quote): void {
    this.editingQuoteId = quote.id;
    this.quoteForm.patchValue({
      text: quote.text,
      author: quote.author
    });
  }

  deleteQuote(id: number): void {
    if (!confirm('Är du säker på att du vill radera detta citat?')) {
      return;
    }

    this.quoteService.deleteQuote(id).subscribe({
      next: () => this.loadQuotes(),
      error: (err) => console.error(err)
    });
  }

  resetForm(): void {
    this.quoteForm.reset();
    this.editingQuoteId = null;
  }
}
