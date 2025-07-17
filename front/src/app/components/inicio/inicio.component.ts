import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../services/administracion/estacion.service';
import {  DataloggerService, DataloggerData } from '../../services/administracion/datalogger.service';
import { DescargaService } from '../../services/administracion/descarga.service'; 
import { Router } from '@angular/router';
import { VisitanteService, Visitante } from '../../services/visitas.service';


declare let L: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  estaciones: any[] = [];
  totalVisitantes: number = 0;
  estacionSeleccionada: number | null = null;
 
estaId?: number;
  fechaInicio?: string;
  fechaFin?: string;
  datos: DataloggerData[] = [];
  mes?: number;
  loading = false;
  errorMessage = '';

  constructor(private estacionService: EstacionService,
    private visitanteService: VisitanteService,
    private dataloggerService: DataloggerService,
    private descargaService: DescargaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarTotalVisitantes();
    
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



  cargarTotalVisitantes() {
    this.visitanteService.obtenerTotalVisitantes().subscribe({
      next: (resp) => {
        this.totalVisitantes = resp.total;
      },
      error: (err) => {
        console.error('Error al obtener total visitantes', err);
      }
    });
  }

  

  private initMap(): void {
    const map = L.map('map').setView([-1.6785, -78.6569], 9);

    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const labelsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap, ©CartoDB'
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri'
    });

    const overlayLayers = {
      'Etiquetas': labelsLayer,
      'Satélite': satelliteLayer
    };

    const baseLayers = {
      'Mapa base': baseLayer
    };

    L.control.layers(baseLayers, overlayLayers).addTo(map);

    // Cargar estaciones desde el servicio y añadir marcadores
    this.estacionService.getAll().subscribe({
      next: (data) => {
        this.estaciones = data;

        this.estaciones.forEach(estacion => {
          const lat = estacion.esta_latitud ; 
          const lon = estacion.esta_longitud ;

          const marker = L.marker([lat, lon]).addTo(map);
          //marker.bindTooltip(estacion.esta_nombre, { permanent: true, direction: 'top' });

          marker.on('click', () => {
            this.showStationDetails(estacion, lat, lon);
          });
        });
      },
      error: (err) => {
        console.error('Error al obtener estaciones:', err);
      }
    });
  }

  



 private showStationDetails(estacion: any, lat: number, lon: number): void {
  // Datos principales (card "Detalles de la Estación")
  document.getElementById('station-name')!.textContent = estacion.nombre_estacion || 'N/A';
  document.getElementById('station-institucion')!.textContent = estacion.institucion_a_cargo || 'N/A';
  document.getElementById('station-lat')!.textContent = lat.toFixed(5);
  document.getElementById('station-lon')!.textContent = lon.toFixed(5);
  document.getElementById('station-canton')!.textContent = estacion.canton || 'N/A';

  // Más información (card "Más Información")
  document.getElementById('station-id')!.textContent = estacion.esta_id?.toString() || 'N/A';
  document.getElementById('station-name-det')!.textContent = estacion.nombre_estacion || 'N/A';
  document.getElementById('station-location-det')!.textContent = estacion.esta_ubicacion || 'N/A';
  document.getElementById('station-lat-det')!.textContent = estacion.esta_latitud?.toString() || 'N/A';
  document.getElementById('station-lon-det')!.textContent = estacion.esta_longitud?.toString() || 'N/A';
  document.getElementById('station-comunidad')!.textContent = estacion.esta_comunidad || 'N/A';
  document.getElementById('station-institucion-cargo')!.textContent = estacion.institucion_a_cargo || 'N/A';
  document.getElementById('station-tipo')!.textContent = estacion.tipo_estacion || 'N/A';
  document.getElementById('station-parr-id')!.textContent = estacion.parroquia || 'N/A';
  document.getElementById('station-path')!.textContent = estacion.provincia || 'N/A';
  document.getElementById('station-updated')!.textContent = estacion.cantidad_sensores?.toString() || '0';


  


}


descargarCSV() {
  if (!this.fechaInicio || !this.fechaFin || !this.mes) {
    this.errorMessage = 'Faltan parámetros para la descarga.';
    return;
  }

  const idEstacion = (this.estaId && !isNaN(this.estaId)) ? this.estaId : undefined;

  // Construir URL
  const params = new URLSearchParams({
    mes: this.mes.toString(),
    desde: this.fechaInicio,
    hasta: this.fechaFin,
    descargar: 'true',
    ...(idEstacion ? { esta_id: idEstacion.toString() } : {})
  });

  const url = `http://localhost:3636/api/datalogger?${params.toString()}`;

  // Crear enlace y disparar descarga
  const link = document.createElement('a');
  link.href = url;
  link.download = `datalogger_${this.fechaInicio}_a_${this.fechaFin}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



  isAuthenticated = false;
  usuario: string = '';
  rol: string = '';
  menuAbierto = false;
  
}

