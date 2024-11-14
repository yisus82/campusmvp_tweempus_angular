export class TokenModel {
  private _key: string;
  private _authorId: string;
  private _authorImage: string;

  constructor(key: string, authorId: string, authorImage: string) {
    this._key = key;
    this._authorId = authorId;
    this._authorImage = authorImage;
  }

  get key(): string {
    return this._key;
  }

  set key(key: string) {
    this._key = key;
  }

  get authorId(): string {
    return this._authorId;
  }

  set authorId(authorId: string) {
    this._authorId = authorId;
  }

  get authorImage(): string {
    return this._authorImage;
  }

  set authorImage(authorImage: string) {
    this._authorImage = authorImage;
  }
}
