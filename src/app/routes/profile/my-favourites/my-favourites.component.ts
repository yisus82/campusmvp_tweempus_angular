import { Component } from '@angular/core';
import { TweempListComponent } from '../../../shared/tweemp-list/tweemp-list.component';

@Component({
  selector: 'tweempus-my-favourites',
  standalone: true,
  imports: [TweempListComponent],
  templateUrl: './my-favourites.component.html',
  styleUrl: './my-favourites.component.css',
})
export class MyFavouritesComponent {}
