import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModel } from './token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: TokenModel | null = null;

  constructor(private router: Router) {
    const tweempus_user = localStorage.getItem('tweempus_user');
    if (tweempus_user) {
      const { key, authorId, authorImage } = JSON.parse(tweempus_user);
      this.token = new TokenModel(key, authorId, authorImage);
    }
  }

  login(authorId: string, authorImage: string) {
    const key = this.generateTokenKey();
    this.token = new TokenModel(key, authorId, authorImage);
    localStorage.setItem('tweempus_user', JSON.stringify({ key, authorId }));
    this.router.navigate(['/']);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('tweempus_user');
    this.router.navigate(['/login']);
  }

  generateTokenKey(length = 32) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const key = [];
    for (let i = 0; i < length; i++) {
      key.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return key.join('');
  }
}
