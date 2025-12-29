import { Component } from '@angular/core';
import { BooksComponent } from './books/books';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksComponent],
  template: `<app-books></app-books>`
})
export class AppComponent {}
