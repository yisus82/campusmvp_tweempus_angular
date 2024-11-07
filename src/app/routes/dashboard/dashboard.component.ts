import { Component } from '@angular/core';
import { TwimpCardComponent } from '../../shared/twimp-card/twimp-card.component';

@Component({
  selector: 'tweempus-dashboard',
  standalone: true,
  imports: [TwimpCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
