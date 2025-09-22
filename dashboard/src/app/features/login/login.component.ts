import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  private http = inject(HttpClient);
  private router = inject(Router);

  submit() {
    this.error = '';
    const email = this.email.trim();
    const password = this.password;
    if (!email || !password) {
      this.error = 'Enter email and password';
      return;
    }
    this.loading = true;
    this.http
      .post<{ access_token: string; user?: any }>('/api/auth/login', { email, password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigateByUrl('/tasks');
        },
        error: (err) => {
          this.error = err?.error?.message || 'Login failed';
          this.loading = false;
        },
      });
  }
}