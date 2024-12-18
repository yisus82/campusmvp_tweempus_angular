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

interface DBUpdateAuthor {
  id: string;
  fullName?: string;
  image?: string;
  favourites?: string[];
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

  getAuthorByEmail(email: string): Observable<AuthorModel> {
    return this.httpClient.get<DBAuthor[]>(this.url).pipe(
      map((dbAuthors: DBAuthor[]) => {
        const dbAuthor = dbAuthors.find((author) => author.email === email);

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

  setAuthor(
    email: string,
    password: string,
    fullName: string,
    image: string
  ): Observable<DBAuthor> {
    const dbAuthor: DBAuthor = {
      id: crypto.randomUUID(),
      email,
      password,
      fullName,
      image: image || 'images/user-icon.png',
      favourites: [],
    };

    return this.httpClient
      .post<DBAuthor>(this.url, dbAuthor)
      .pipe(catchError(this.handleError));
  }

  updateAuthor({
    authorId,
    fullName,
    image,
    favourites,
  }: {
    authorId: string;
    fullName: string;
    image: string;
    favourites: string[];
  }): Observable<DBAuthor> {
    const dbAuthor: DBUpdateAuthor = {
      id: authorId,
      fullName: fullName,
      image: image,
      favourites: favourites,
    };

    return this.httpClient
      .patch<DBAuthor>(`${this.url}/${authorId}`, dbAuthor)
      .pipe(catchError(this.handleError));
  }

  toggleFavourite(authorId: string, tweempId: string): Observable<DBAuthor> {
    return this.httpClient.get<DBAuthor>(`${this.url}/${authorId}`).pipe(
      map((dbAuthor: DBAuthor) => {
        const index = dbAuthor.favourites.indexOf(tweempId);

        if (index === -1) {
          dbAuthor.favourites.push(tweempId);
        } else {
          dbAuthor.favourites.splice(index, 1);
        }

        return dbAuthor;
      }),
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
