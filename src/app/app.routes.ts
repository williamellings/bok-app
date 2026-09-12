import { Routes } from '@angular/router';
import { Books } from './components/books/books';
import { BookForm } from './components/book-form/book-form';
import { Login } from './components/login/login';
import { Quotes } from './components/quotes/quotes';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: Books, canActivate: [authGuard] },
  { path: 'books/new', component: BookForm, canActivate: [authGuard] },
  { path: 'books/:id/edit', component: BookForm, canActivate: [authGuard] },
  { path: 'quotes', component: Quotes, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
