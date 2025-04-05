import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthResponse {
  message: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  // Add other fields like address/phone if needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5181/api/auth'; // ✅ Update this port if your backend differs
  private helper = new JwtHelperService();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }

  // ========== LOGIN ==========
  login(email: string, password: string): Observable<AuthResponse> {
    const request: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          if (this.isBrowser && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  // ========== REGISTER ==========
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(response => {
          if (this.isBrowser && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  // ========== LOGOUT ==========
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  // ========== CHECK AUTH ==========
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.helper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return this.getStorage()?.getItem('token') || null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.helper.decodeToken(token);
    return decoded?.nameid ? parseInt(decoded.nameid) : null;
  }
}
