import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { AuthorService } from '../author/author.service';
import { TweempModel } from '../tweemp/tweemp.model';

@Component({
  selector: 'tweempus-tweemp-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tweemp-card.component.html',
  styleUrl: './tweemp-card.component.css',
})
export class TweempCardComponent {
  @Input({ required: true }) tweemp!: TweempModel;

  @Output() favouritesChanged = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private authorService: AuthorService
  ) {}

  changeFavourites(state: void) {
    this.favouritesChanged.emit(state);
  }

  toggleFavourite() {
    if (this.authService.token) {
      const authorId = this.authService.token.authorId;
      const tweempId = this.tweemp.id;

      this.authorService.toggleFavourite(authorId, tweempId).subscribe({
        next: (author) => {
          this.authorService.updateAuthor({ ...author, authorId }).subscribe({
            next: (updatedAuthor) => {
              this.tweemp.isFavourite =
                updatedAuthor.favourites.includes(tweempId);
              this.changeFavourites();
            },
            error: (error) => {
              console.error(error);
            },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
