import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  filter,
  map,
  Observable,
  throwError,
  toArray,
} from 'rxjs';
import { AuthorModel } from '../author/author.model';
import { AuthorService } from '../author/author.service';
import { TweempModel } from './tweemp.model';

interface DBTweemp {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class TweempService {
  private url = 'http://localhost:3000/tweemps';

  constructor(
    private httpClient: HttpClient,
    private authorService: AuthorService
  ) {}

  getTweemps(): Observable<TweempModel[]> {
    return this.httpClient.get<DBTweemp[]>(this.url).pipe(
      concatMap((dbTweemps: DBTweemp[]) => dbTweemps),
      map((dbTweemp: DBTweemp) => {
        const tweemp = new TweempModel(
          dbTweemp.id,
          new AuthorModel(dbTweemp.author),
          dbTweemp.content,
          new Date(dbTweemp.timestamp)
        );
        return tweemp;
      }),
      toArray(),
      catchError(this.handleError)
    );
  }

  getTweempsByAuthor(authorID: string): Observable<TweempModel[]> {
    return this.httpClient.get<DBTweemp[]>(this.url).pipe(
      concatMap((dbTweemps: DBTweemp[]) => dbTweemps),
      map((dbTweemp: DBTweemp) => {
        const tweemp = new TweempModel(
          dbTweemp.id,
          new AuthorModel(dbTweemp.author),
          dbTweemp.content,
          new Date(dbTweemp.timestamp)
        );
        return tweemp;
      }),
      filter((tweemp: TweempModel) => tweemp.author.id === authorID),
      toArray(),
      catchError(this.handleError)
    );
  }

  isFavourite(authorID: string, tweempID: string): Observable<boolean> {
    return this.authorService.getAuthorById(authorID).pipe(
      map((author) => author.favourites.includes(tweempID)),
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
