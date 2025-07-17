import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminEstacionesService {
  private apiUrl = 'http://localhost:3636/api/admin/esta'; 
  private geoApiUrl = 'http://localhost:3636/api/admin';

  constructor(private http: HttpClient) {}

  // Obtener todas las estaciones
  getAllEstaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener estación por ID
  getEstacionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Buscar estación por ID o nombre
  searchEstaciones(search: string): Observable<any> {
    const params = new HttpParams().set('search', search);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  // Crear una nueva estación
  createEstacion(estacionData: any): Observable<any> {
    return this.http.post(this.apiUrl, estacionData);
  }

  // Actualizar estación existente
  updateEstacion(id: number, estacionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estacionData);
  }

  // Eliminar una estación
  deleteEstacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // NUEVOS MÉTODOS GEOGRÁFICOS

getProvincias(): Observable<any> {
  return this.http.get(`${this.geoApiUrl}/provincias`);
}

getCantones(provId: number): Observable<any> {
  return this.http.get(`${this.geoApiUrl}/cantones/${provId}`);
}

getParroquias(cantId: number): Observable<any> {
  return this.http.get(`${this.geoApiUrl}/parroquias/${cantId}`);
}

getTiposEstacion() {
  return this.http.get<any[]>(`${this.geoApiUrl}/tipoestacion`);
}


  
}
