import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss']
})
export class EditBookDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data : Book
  ) {
    this.form = this.fb.group({
      id: data.id,
      name: data.name,
      desc: data.desc,
      author: data.author,
      imageLink: data.imageLink,
      isFavorite: data.isFavorite,
      isRead: data.isRead
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.dialogRef
      .afterClosed()
      .subscribe((data) =>
        this.editBook(this.dataToBook(data))
      );
  }

  close() {
    this.dialogRef.close();
  }

  editBook(book: Book): void {
    this.bookService.updateBook(book).subscribe();
  }

  dataToBook(data: any): Book {
    return data as Book;
  }
}
