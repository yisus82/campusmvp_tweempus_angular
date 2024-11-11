import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorCardComponent } from '../../shared/author-card/author-card.component';

@Component({
  selector: 'tweempus-profile',
  standalone: true,
  imports: [AuthorCardComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
