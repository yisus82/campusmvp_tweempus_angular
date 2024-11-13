import { AuthorModel } from '../author/author.model';

export class TweempModel {
  private _id: string;
  private _url: string;
  private _author: AuthorModel;
  private _content: string;
  private _timestamp: Date;
  private _isFavourite: boolean;

  constructor(
    id: string,
    author: AuthorModel,
    content: string,
    timestamp: Date
  ) {
    this._id = id;
    this._url = `/tweemp/${id}`;
    this._author = author;
    this._content = content;
    this._timestamp = timestamp;
    this._isFavourite = false;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get url(): string {
    return this._url;
  }

  set url(url: string) {
    this._url = url;
  }

  get author(): AuthorModel {
    return this._author;
  }

  set author(author: AuthorModel) {
    this._author = author;
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp;
  }

  get isFavourite(): boolean {
    return this._isFavourite;
  }

  set isFavourite(favourite: boolean) {
    this._isFavourite = favourite;
  }
}
