import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) tweemps!: TweempModel[];
}
