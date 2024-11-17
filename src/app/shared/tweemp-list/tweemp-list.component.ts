import { Component, Input } from '@angular/core';
import { TweempCardComponent } from '../tweemp-card/tweemp-card.component';
import { SortByDatePipe } from '../tweemp/sort-by-date.pipe';
import { TweempModel } from '../tweemp/tweemp.model';

@Component({
  selector: 'tweempus-tweemp-list',
  standalone: true,
  imports: [TweempCardComponent, SortByDatePipe],
  templateUrl: './tweemp-list.component.html',
  styleUrl: './tweemp-list.component.css',
})
export class TweempListComponent {
  @Input({ required: true }) tweemps!: TweempModel[];
  @Input() watchFavourites = false;

  onFavouritesChanged() {
    if (this.watchFavourites) {
      this.tweemps = this.tweemps.filter((tweemp) => tweemp.isFavourite);
    }
  }
}
