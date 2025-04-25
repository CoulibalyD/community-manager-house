import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUser = new BehaviorSubject<LoginResponse | null>(this.getUserFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  /** Observable pour suivre l'utilisateur dans les composants */
  get currentUser$(): Observable<LoginResponse | null> {
    return this.currentUser.asObservable();
  }

  /** Récupération synchrone du user actuel */
  get currentUserValue(): LoginResponse | null {
    return this.currentUser.value;
  }

  /** Authentifie un utilisateur */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('auth', JSON.stringify(user));
        this.currentUser.next(user);
      })
    );
  }

  /** Inscription */
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  /** Déconnexion */
  logout(): void {
    localStorage.removeItem('auth');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  /** Token actuel */
  getToken(): string | null {
    return this.currentUser.value?.token || null;
  }

  /** Rôle actuel */
  getRole(): string | null {
    return this.currentUser.value?.role || null;
  }

  /** Est-ce qu'un utilisateur est connecté ? */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Récupère les infos stockées localement */
  private getUserFromStorage(): LoginResponse | null {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
  }
}
