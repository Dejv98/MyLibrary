import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data : Book
  ) {
    this.form = this.fb.group({
      id: null,
      name: '',
      desc: '',
      author: '',
      imageLink: '',
      isFavorite: false,
      isRead: false
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.dialogRef
      .afterClosed()
      .subscribe((data) =>
        this.bookService.addBook(this.dataToBook(data)).subscribe()
      )
  }

  close() {
    this.dialogRef.close();
  }

  dataToBook(data: any): Book {
    return data as Book;
  }
}
