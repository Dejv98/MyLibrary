import { Component } from '@angular/core';
import { Book } from './Book';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  books: Book[];
  constructor(private bookService: BookService){

  }

  getBooks(): void{
    this.bookService.getBooks().subscribe((books) => {
      (this.books = books);
    });
  }

  getFavBooks(): void{
    this.bookService
      .getBooks()
      .subscribe((books) => (this.books = books.filter((b) => b.isFavorite !== false))
      );
  }

  getReadBooks(): void{
    this.bookService
      .getBooks()
      .subscribe((books) => (this.books = books.filter((b) => b.isRead !== false))
      );
  }
}
