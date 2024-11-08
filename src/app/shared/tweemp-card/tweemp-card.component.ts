import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TweempModel } from '../tweemp/tweemp.model';

@Component({
  selector: 'tweempus-tweemp-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tweemp-card.component.html',
  styleUrl: './tweemp-card.component.css',
})
export class TweempCardComponent {
  @Input({ required: true }) tweemp!: TweempModel;
}
