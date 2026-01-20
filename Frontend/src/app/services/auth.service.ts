import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3636/api/auth';  

  constructor(private http: HttpClient) { }

  // Registro de usuario
  register(nombre: string, apellido: string, correo: string, contrasena: string, confirmarContrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, apellido, correo, contrasena, confirmarContrasena });
  }

  // Login de usuario
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasena });
  }

  

   //Obtener perfil de usuario
   getPerfil(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/perfil`, { headers });
  }

 

   // Obtener perfil de usuario
   getPerfilU(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/perfil`, { headers });
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    
  }

  
}
