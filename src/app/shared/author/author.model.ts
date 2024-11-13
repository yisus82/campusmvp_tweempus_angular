export class AuthorModel {
  private _id: string;
  private _url: string;
  private _fullName: string;
  private _image: string;
  private _favourites: string[];

  constructor(id: string) {
    this._id = id;
    this._url = `/profile/${id}`;
    this._fullName = 'Author';
    this._image = 'images/user-icon.png';
    this._favourites = [];
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

  get fullName(): string {
    return this._fullName;
  }

  set fullName(fullName: string) {
    this._fullName = fullName;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get favourites(): string[] {
    return this._favourites;
  }

  set favourites(favourites: string[]) {
    this._favourites = favourites;
  }
}
