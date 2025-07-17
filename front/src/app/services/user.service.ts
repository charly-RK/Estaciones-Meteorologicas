import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }

  // Método para obtener los datos del usuario autenticado
  getAuthenticatedUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getRecentUsers(limit: number = 10): Observable<any[]> {
    const token = localStorage.getItem('token'); // Obtén el token almacenado
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/recent?limit=${limit}`, { headers });
  }
  
  
}
