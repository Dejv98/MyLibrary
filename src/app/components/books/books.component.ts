import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  filterValue: string = '';
  @Input() books: Book[] = [];
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isFav: boolean;
  isRead: boolean;
  pageIndex: number = 0;
  @Input() length: number = 100;

  openEditBookDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = book;

    this.dialog.open(EditBookDialogComponent, dialogConfig);
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchBook(this.filterValue, this.isFav, this.isRead);
  }

  dataToBook(data: any): Book {
    return data as Book;
  }

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books, this.length = books.length));
  }

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
    if (this.isRead) {
      
      this.books = this.books.filter((b) => b.isRead == this.isRead);
    }
  }

  favoriteBook(book: Book): void {
    book.isFavorite = !book.isFavorite;
    this.bookService.updateBook(book).subscribe();
    if (this.isFav) {
      this.books = this.books.filter((b) => b.isFavorite == this.isFav);
    }
  }

  //code below is shitty as hell but i'm too lazy to fix this shit right now. Still better code than canal developer can produce
  //fixed
  searchBook(searchWord: string, isFav: boolean, isRead: boolean): void {
    this.bookService
      .getBooksPaginate(
        isFav,
        isRead,
        searchWord,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((books) => (this.books = books));
      this.bookService
      .getBooksPaginate(
        isFav,
        isRead,
        searchWord,
        null,
        100000
      )
      .subscribe((books) => (this.length = books.length));
      this.pageIndex = 0;
  }
}
