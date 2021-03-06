import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'MyLibrary';
  @Output() btnHomeClick = new EventEmitter();
  @Output() btnFavClick = new EventEmitter();
  @Output() btnReadClick = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {}

  openAddBookDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    this.dialog.open(AddBookDialogComponent, dialogConfig);
  }

  dataToBook(data: any): Book {
    return data as Book;
  }
  onHomeButton(): void{
    this.btnHomeClick.emit();
  }
  onFavButton(): void{
    this.btnFavClick.emit();
  }
  onReadButton(): void{
    this.btnReadClick.emit();
  }
}
