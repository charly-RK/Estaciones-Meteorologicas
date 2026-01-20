/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {
  private apiUrl = 'http://localhost:3636/api/estaciones'; // URL de tu API

  constructor(private http: HttpClient) {}

  getEstaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEstacionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearEstacion(estacion: any): Observable<any> {
    return this.http.post(this.apiUrl, estacion);
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estacion {
  [key: string]: any;
  esta_id: string;
  tipoesta_id: string;
  parr_id: string;
  esta_nombre: string;
  esta_ubicacion: string;
  esta_latitud: number;
  esta_longitud: number;
  esta_alturaterreno: number;
  esta_promotorterreno: string;
  esta_propietarioinstitucion: string;
  esta_institucionacargo: string;
  esta_manualautomatica: string;
  esta_codigoinamhi: string;
  esta_path: string;
  esta_comunidad: string;
  esta_nombrearchivo: string;
  esta_path_leidos: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstacionService {
  private apiUrl = 'http://localhost:3636/api/estaciones';

  constructor(private http: HttpClient) {}

 getAll(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(this.apiUrl);
  }

  getById(id: string): Observable<Estacion> {
    return this.http.get<Estacion>(`${this.apiUrl}/${id}`);
  }

  searchByIdOrNombre(search: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar?search=${search}`);
  }

}
