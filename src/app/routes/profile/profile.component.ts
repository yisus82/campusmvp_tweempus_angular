import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
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
export class ProfileComponent implements OnInit {
  author: AuthorModel | null = null;

  constructor(
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const loggedAuthorId = this.authService.token?.authorId;

    if (!loggedAuthorId) {
      return;
    }

    this.authorService.getAuthorById(loggedAuthorId).subscribe({
      next: (author) => {
        this.author = author;
      },
    });
  }
}
