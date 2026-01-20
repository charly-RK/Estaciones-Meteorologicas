import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescargaService {
  datosDescarga: {
    mes: number,
    desde: string,
    hasta: string,
    esta_id?: number
  } | null = null;

  setDatos(datos: any) {
    this.datosDescarga = datos;
  }

  getDatos() {
    return this.datosDescarga;
  }

  clear() {
    this.datosDescarga = null;
  }
}
