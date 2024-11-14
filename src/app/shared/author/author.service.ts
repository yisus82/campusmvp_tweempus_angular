import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthorModel } from './author.model';

interface DBAuthor {
  id: string;
  email: string;
  password: string;
  fullName: string;
  image: string;
  favourites: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private url = 'http://localhost:3000/authors';

  constructor(private httpClient: HttpClient) {}

  getAuthorById(authorId: string): Observable<AuthorModel> {
    return this.httpClient.get<DBAuthor>(`${this.url}/${authorId}`).pipe(
      map((dbAuthor: DBAuthor) => {
        const author = new AuthorModel(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        author.favourites = dbAuthor.favourites;
        return author;
      }),
      catchError(this.handleError)
    );
  }

  getAuthorByEmailAndPassword(
    email: string,
    password: string
  ): Observable<AuthorModel> {
    return this.httpClient.get<DBAuthor[]>(this.url).pipe(
      map((dbAuthors: DBAuthor[]) => {
        const dbAuthor = dbAuthors.find(
          (author) => author.email === email && author.password === password
        );

        if (!dbAuthor) {
          throw new Error('User not found');
        }

        const author = new AuthorModel(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        author.favourites = dbAuthor.favourites;
        return author;
      }),
      catchError(this.handleError)
    );
  }

  getAuthors(): Observable<AuthorModel[]> {
    return this.httpClient.get<DBAuthor[]>(this.url).pipe(
      map((dbAuthors: DBAuthor[]) =>
        dbAuthors.map((dbAuthor) => {
          const author = new AuthorModel(dbAuthor.id);
          author.fullName = dbAuthor.fullName;
          author.image = dbAuthor.image;
          author.favourites = dbAuthor.favourites;
          return author;
        })
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: {
    message?: string;
    status?: string;
    statusText?: string;
  }) {
    const errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
