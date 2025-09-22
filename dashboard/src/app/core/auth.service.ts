import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<{ access_token: string; user?: any }>(
      '/api/auth/login',
      { email, password }
    );
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}