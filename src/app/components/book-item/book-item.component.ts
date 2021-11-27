import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Book } from 'src/app/Book';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Output() onDeleteBook: EventEmitter<Book> = new EventEmitter();
  @Output() onReadBook: EventEmitter<Book> = new EventEmitter();
  @Output() onFavoriteBook: EventEmitter<Book> = new EventEmitter();
  @Output() onEditBook: EventEmitter<Book> = new EventEmitter();
  constructor() {}


  ngOnInit(): void {}



  onDelete(book: Book) {
    this.onDeleteBook.emit(book);
  }

  onRead(book: Book) {
    this.onReadBook.emit(book);
  }

  onFavorite(book: Book) {
    this.onFavoriteBook.emit(book);
  }

  onEdit(book: Book){
    this.onEditBook.emit(book);
  }
}
