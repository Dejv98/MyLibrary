import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/app/Book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5000/books';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  deleteBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.delete<Book>(url);
  }

  updateBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put<Book>(url, book, httpOptions);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, httpOptions);
  }

  getBooksPaginate(isFav: boolean, isRead:boolean, keyWord: string ,page : number, size: number): Observable<Book[]> {
    let url = `${this.apiUrl}?q=${keyWord}`;
    if (isFav) {
      url += '&isFavorite=true';
    }
    if (isRead) {
      url += '&isRead=true';
    }
    url += `&_page=${page+1}&_limit=${size}`;
    return this.http.get<Book[]>(url, httpOptions);
  }
}
