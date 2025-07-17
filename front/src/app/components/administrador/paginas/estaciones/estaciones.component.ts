import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../../services/administracion/estacion.service';
import { DataloggerService, DataloggerData } from '../../../../services/administracion/datalogger.service';
import { DescargaService } from '../../../../services/administracion/descarga.service'; 
import { Router } from '@angular/router';
import { VisitanteService } from '../../../../services/visitas.service';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.css']
})
export class EstacionesComponent implements OnInit {
  estaciones: any[] = [];
  totalVisitantes: number = 0;
  estaId?: number;
  fechaInicio?: string;
  fechaFin?: string;
  datos: DataloggerData[] = [];
  mes?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private estacionService: EstacionService,
    private visitanteService: VisitanteService,
    private dataloggerService: DataloggerService,
    private descargaService: DescargaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estacionService.getAll().subscribe({
      next: (data) => {
        this.estaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener estaciones:', err);
      }
    });
  }

  buscarDatos() {
  this.errorMessage = '';

  if (!this.fechaInicio || !this.fechaFin) {
    this.errorMessage = 'Debe seleccionar fecha inicio y fecha fin';
    return;
  }

  // Validar que fechaFin no sea menor a fechaInicio
  const inicioDate = new Date(this.fechaInicio);
  const finDate = new Date(this.fechaFin);

  if (finDate < inicioDate) {
    this.errorMessage = 'La fecha fin no puede ser menor a la fecha inicio.';
    this.datos = []; // opcional: limpiar datos previos
    return;
  }

  const getYearMonthFromDateString = (dateStr: string): { year: number, month: number } | null => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    return (!isNaN(year) && !isNaN(month)) ? { year, month } : null;
  };

  const inicio = getYearMonthFromDateString(this.fechaInicio);
  if (!inicio || inicio.month < 1 || inicio.month > 12) {
    this.errorMessage = 'Fecha o mes inválido.';
    return;
  }

  this.mes = inicio.month;
  this.loading = true;

  const idEstacion = (this.estaId && !isNaN(this.estaId)) ? this.estaId : undefined;

  this.dataloggerService.obtenerDatos(this.mes, this.fechaInicio, this.fechaFin, idEstacion)
    .subscribe({
      next: (data) => {
        this.datos = data;
        if (data.length === 0) {
          this.errorMessage = 'No se encontraron datos para el filtro seleccionado.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al obtener datos del servidor.';
        this.loading = false;
      }
    });
}


  irARegistroYDescargar() {
    if (!this.fechaInicio || !this.fechaFin || !this.mes) {
      this.errorMessage = 'Faltan parámetros para la descarga.';
      return;
    }

    const idEstacion = (this.estaId && !isNaN(this.estaId)) ? this.estaId : undefined;

    this.descargaService.setDatos({
      mes: this.mes,
      desde: this.fechaInicio,
      hasta: this.fechaFin,
      esta_id: idEstacion
    });

    this.router.navigate(['/registro']);
  }

  descargarCSV() {
    if (!this.fechaInicio || !this.fechaFin || !this.mes) {
      this.errorMessage = 'Faltan parámetros para la descarga.';
      return;
    }

    const idEstacion = (this.estaId && !isNaN(this.estaId)) ? this.estaId : undefined;
    const params = new URLSearchParams({
      mes: this.mes.toString(),
      desde: this.fechaInicio,
      hasta: this.fechaFin,
      descargar: 'true',
      ...(idEstacion ? { esta_id: idEstacion.toString() } : {})
    });

    const url = `http://localhost:3636/api/datalogger?${params.toString()}`;

    const link = document.createElement('a');
    link.href = url;
    link.download = `datalogger_${this.fechaInicio}_a_${this.fechaFin}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

 
}
