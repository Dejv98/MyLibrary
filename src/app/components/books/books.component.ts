import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input() books: Book[] = [];
  totalRecords: Number;
  page: Number = 1;

  openEditBookDialog(book : Book) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = book;

    this.dialog.open(EditBookDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(EditBookDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) =>
        this.editBook(this.dataToBook(data))
      );
  }

  dataToBook(data: any): Book {
    return data as Book;
  }

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteBook(book: Book): void {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () => (this.books = this.books.filter((b) => b.id !== book.id))
      );
  }

  readBook(book: Book): void {
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
