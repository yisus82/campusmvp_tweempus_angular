import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { AuthorCardComponent } from '../../shared/author-card/author-card.component';
import { AuthorModel } from '../../shared/author/author.model';
import { AuthorService } from '../../shared/author/author.service';

@Component({
  selector: 'tweempus-profile',
  standalone: true,
  imports: [AuthorCardComponent, RouterOutlet, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  author: AuthorModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {
    this.route.params
      .pipe(
        map((params) => params['id']),
        concatMap((id) => this.authorService.getAuthorById(id))
      )
      .subscribe({
        next: (author) => (this.author = author),
      });
  }
}
