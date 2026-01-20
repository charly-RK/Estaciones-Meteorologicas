// src/app/services/visitante.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Visitante {
  nombre: string;
  apellido: string;
  correo: string;
  cedula: string;
  razon_visita: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  private apiUrl = 'http://localhost:3636/api/visitantes'; 

  constructor(private http: HttpClient) {}

  registrarVisitante(visitante: Visitante): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, visitante);
  }

  obtenerTotalVisitantes(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total`);
  }
}
