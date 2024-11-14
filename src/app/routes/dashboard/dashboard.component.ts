import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, of } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { AuthorService } from '../../shared/author/author.service';
import { TweempListComponent } from '../../shared/tweemp-list/tweemp-list.component';
import { TweempModel } from '../../shared/tweemp/tweemp.model';
import { TweempService } from '../../shared/tweemp/tweemp.service';

@Component({
  selector: 'tweempus-dashboard',
  standalone: true,
  imports: [TweempListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  tweempsList: TweempModel[] = [];

  constructor(
    private tweempService: TweempService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const loggedAuthorId = this.authService.token?.authorId;

    if (!loggedAuthorId) {
      return;
    }

    this.tweempService
      .getTweemps()
      .pipe(
        concatMap((tweemps) => tweemps),
        concatMap((tweemp) =>
          combineLatest([
            of(tweemp),
            this.authorService.getAuthor(tweemp.author.id),
          ])
        ),
        concatMap(([tweemp, author]) => {
          tweemp.author = author;
          return combineLatest([
            of(tweemp),
            this.tweempService.isFavourite(loggedAuthorId, tweemp.id),
          ]);
        })
      )
      .subscribe({
        next: ([tweemp, isFavourite]) => {
          tweemp.isFavourite = isFavourite;
          this.tweempsList.push(tweemp);
        },
      });
  }
}
