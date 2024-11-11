import { Component } from '@angular/core';
import { TweempListComponent } from '../../../shared/tweemp-list/tweemp-list.component';

@Component({
  selector: 'tweempus-my-tweemps',
  standalone: true,
  imports: [TweempListComponent],
  templateUrl: './my-tweemps.component.html',
  styleUrl: './my-tweemps.component.css',
})
export class MyTweempsComponent {}
