import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, concatMap, of } from 'rxjs';
import { AuthorService } from '../../../shared/author/author.service';
import { TweempListComponent } from '../../../shared/tweemp-list/tweemp-list.component';
import { TweempModel } from '../../../shared/tweemp/tweemp.model';
import { TweempService } from '../../../shared/tweemp/tweemp.service';

@Component({
  selector: 'tweempus-my-favourites',
  standalone: true,
  imports: [TweempListComponent],
  templateUrl: './my-favourites.component.html',
  styleUrl: './my-favourites.component.css',
})
export class MyFavouritesComponent {
  tweempsList: TweempModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private tweempService: TweempService,
    private authorService: AuthorService
  ) {
    const idAuthor = this.route.parent!.snapshot.params['id'];

    this.tweempService
      .getTweemps()
      .pipe(
        concatMap((tweemps) => tweemps),
        concatMap((tweemp) =>
          combineLatest([
            of(tweemp),
            this.authorService.getAuthorById(tweemp.author.id),
          ])
        ),
        concatMap(([tweemp, author]) => {
          tweemp.author = author;
          return combineLatest([
            of(tweemp),
            this.tweempService.isFavourite(idAuthor, tweemp.id),
          ]);
        })
      )
      .subscribe({
        next: ([tweemp, isFavourite]) => {
          if (isFavourite) {
            tweemp.isFavourite = isFavourite;
            this.tweempsList.push(tweemp);
          }
        },
      });
  }
}
