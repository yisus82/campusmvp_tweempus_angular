import { Component } from '@angular/core';
import { AuthorCardComponent } from '../../shared/author-card/author-card.component';
import { TweempListComponent } from '../../shared/tweemp-list/tweemp-list.component';

@Component({
  selector: 'tweempus-profile',
  standalone: true,
  imports: [AuthorCardComponent, TweempListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
