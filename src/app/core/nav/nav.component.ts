import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'tweempus-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  loggedAuthorId: string | null = null;
  constructor(private authService: AuthService) {}

  isAuthorLoggedIn() {
    this.loggedAuthorId = this.authService.token?.authorId ?? null;
    return this.authService.token !== null;
  }
}
