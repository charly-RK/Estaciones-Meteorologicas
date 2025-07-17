import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DataloggerData {
  esta_id: number;
  esta_nombre: string;
  sens_id: number;
  sens_nombre: string;
  sens_modelo: string;
  sens_estado: string;
  marca: string;
  varidata_id: number;
  varidata_nombre: string;
  valor_dataloger: number;
  fecha_dataloger: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataloggerService {

  private baseUrl = 'http://localhost:3636/api/datalogger';

  constructor(private http: HttpClient) {}

  obtenerDatos(mes: number, desde: string, hasta: string, esta_id?: number): Observable<DataloggerData[]> {
  let params = new HttpParams()
    .set('mes', mes.toString())
    .set('desde', desde)
    .set('hasta', hasta);

  if (esta_id !== undefined && esta_id !== null && !isNaN(esta_id)) {
    params = params.set('esta_id', esta_id.toString());
  }

  return this.http.get<DataloggerData[]>(this.baseUrl, { params });
}

}



