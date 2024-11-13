import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorCardComponent } from '../../shared/author-card/author-card.component';
import { AuthorModel } from '../../shared/author/author.model';
import { AuthorService } from '../../shared/author/author.service';

@Component({
  selector: 'tweempus-profile',
  standalone: true,
  imports: [AuthorCardComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  loggedAuthorId = '330e902d-6ed9-45de-b654-d3e4591c7538';
  author: AuthorModel = new AuthorModel(this.loggedAuthorId);

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.authorService.getAuthor(this.loggedAuthorId).subscribe({
      next: (author) => {
        this.author = author;
      },
    });
  }
}
