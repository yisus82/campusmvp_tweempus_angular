import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'tweempus-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isAuthorLoggedIn() {
    return this.authService.token !== null;
  }

  getAuthorImage() {
    return this.authService.token?.authorImage;
  }

  logout() {
    this.authService.logout();
  }
}
