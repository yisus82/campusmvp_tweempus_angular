import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, of } from 'rxjs';
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
  loggedAuthorId = '330e902d-6ed9-45de-b654-d3e4591c7538';

  constructor(
    private tweempService: TweempService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
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
            this.tweempService.isFavourite(this.loggedAuthorId, tweemp.id),
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
