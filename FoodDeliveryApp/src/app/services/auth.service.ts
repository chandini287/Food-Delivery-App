import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface AuthResponse {
  message: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  private apiUrl = 'http://localhost:5089/api/auth';
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

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    const storage = this.getStorage();
    return storage ? !!storage.getItem('token') : false;
  }

  getToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem('token') : null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken ? parseInt(decodedToken.nameid) : null;
  }
}