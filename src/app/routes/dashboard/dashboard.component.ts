import { Component } from '@angular/core';
import { TweempListComponent } from '../../shared/tweemp-list/tweemp-list.component';

@Component({
  selector: 'tweempus-dashboard',
  standalone: true,
  imports: [TweempListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
