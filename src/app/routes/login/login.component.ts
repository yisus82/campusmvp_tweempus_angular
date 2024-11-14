import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'tweempus-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(authorId: string, authorImage: string) {
    this.authService.login(authorId, authorImage);
  }
}
