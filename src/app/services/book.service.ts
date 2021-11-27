import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/Book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root',
})
export class BookService {

 /* form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    desc: new FormControl('', Validators.maxLength(250)),
    author: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    imageLink: new FormControl(''),
    isFavorite: new FormControl(false),
    isRead: new FormControl(false),

  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      desc: '',
      author: '',
      imageLink: '',
      isFavorite: false,
      isRead: false
    });
  }
*/


  private apiUrl = 'http://localhost:5000/books'
  constructor(private http:HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  deleteBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`
    return this.http.delete<Book>(url);
  }

  updateBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`
    return this.http.put<Book>(url, book, httpOptions);
  }

  addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.apiUrl, book, httpOptions);
  }

}
