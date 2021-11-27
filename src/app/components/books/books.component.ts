import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  totalRecords: Number;
  page: Number = 1;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      (this.books = books), (this.totalRecords = books.length);
    });
  }

  deleteBook(book: Book): void {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () => (this.books = this.books.filter((b) => b.id !== book.id))
      );
  }

  readBook(book: Book): void {
    console.log(book);
    book.isRead = !book.isRead;
    this.bookService.updateBook(book).subscribe();
  }

  favoriteBook(book: Book): void {
    book.isFavorite = !book.isFavorite;
    this.bookService.updateBook(book).subscribe();
  }

  editBook(book: Book): void {
    this.bookService.updateBook(book).subscribe();
  }
}
