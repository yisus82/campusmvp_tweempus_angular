import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { NavComponent } from './core/nav/nav.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

@Component({
  selector: 'tweempus-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tweempus';
}
