import { Component } from '@angular/core';

import { UppercaseBookPipe } from '../uppercase-book-pipe';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [UppercaseBookPipe],
  templateUrl: './books.html'
})
export class BooksComponent {

  books = [
    { name: 'Clean Code', year: 2008 },
    { name: 'Angular in Action', year: 2021 },
    { name: 'Learning Angular', year: 2022 },
    { name: 'Modern Web Dev', year: 2024 }
  ];

}
