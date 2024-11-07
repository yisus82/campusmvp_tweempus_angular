import { Component } from '@angular/core';
import { AuthorModel } from '../author/author.model';
import { TweempCardComponent } from '../tweemp-card/tweemp-card.component';
import { TweempModel } from '../tweemp/tweemp.model';

@Component({
  selector: 'tweempus-tweemp-list',
  standalone: true,
  imports: [TweempCardComponent],
  templateUrl: './tweemp-list.component.html',
  styleUrl: './tweemp-list.component.css',
})
export class TweempListComponent {
  text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. \
    Libero adipisci dolor expedita reprehenderit aut inventore, \
    porro excepturi quis voluptas laborum ducimus architecto. \
    Dolore laboriosam exercitationem nostrum doloremque saepe molestias rem.';
  authors: AuthorModel[] = [];
  tweemps: TweempModel[] = [];

  constructor() {
    this.authors.push(new AuthorModel('1'));
    this.tweemps.push(
      new TweempModel('1', this.authors[0], this.text, new Date())
    );
    this.tweemps.push(
      new TweempModel('2', this.authors[0], this.text, new Date())
    );
    this.tweemps.push(
      new TweempModel('3', this.authors[0], this.text, new Date())
    );
    this.tweemps.push(
      new TweempModel('4', this.authors[0], this.text, new Date())
    );
  }
}
