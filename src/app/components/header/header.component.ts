import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { BooksComponent } from '../books/books.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title : string = 'MyLibrary';
  constructor(private dialog: MatDialog, private bookService: BookService) { }

  ngOnInit(): void {
  }

  openAddBookDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
    };

    this.dialog.open(AddBookDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddBookDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(data => this.bookService.addBook(this.dataToBook(data)).subscribe());
  }

  dataToBook(data: any) : Book{
    return data as Book;
  }
}
