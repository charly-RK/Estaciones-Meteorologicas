

/*import { Component, OnInit,  ElementRef, ViewChildren, AfterViewInit,QueryList } from '@angular/core';
import { EstacionService } from '../../services/administracion/estacion.service';
declare let L: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  locations = [
    { name: 'ALAO', coords: [-1.86949, -78.54169], canton: 'Riobamba', visits: 9 },
    { name: 'ATILLO', coords: [-2.18699, -78.54919], canton: 'Guamote', visits: 22 },
    { name: 'CHIMBORAZO', coords: [-1.53345, -78.87785], canton: 'Riobamba', visits: 22 },
    { name: 'GUARGUALLÁ', coords: [-1.921319, -78.564239], canton: 'Riobamba', visits: 12 },
    { name: 'CUMANDÁ', coords: [-2.21039, -79.16429], canton: 'Cumandá', visits: 13 },
    { name: 'ESPOCH', coords: [-1.65459, -78.67759], canton: 'Riobamba', visits: 20 },
    { name: 'IGUALATA', coords: [-1.54575, -78.60101], canton: 'Guano', visits: 20 },
    { name: 'MATUS', coords: [-1.55561, -78.50557], canton: 'Penipe', visits: 5 },
    { name: 'MOYOCANCHA', coords: [-2.16691, -78.71165], canton: 'Alausí', visits: 7 },
    { name: 'MULTITUD', coords: [-2.12579, -78.97089], canton: 'Alausí', visits: 6 },
    { name: 'QUIMIAG', coords: [-1.65959, -78.57259], canton: 'Riobamba', visits: 30 },
    { name: 'SAN ISIDRO', coords: [-1.48839, -78.71219], canton: 'Guano', visits: 30 },
    { name: 'SAN JUAN', coords: [-1.63769, -78.78359], canton: 'Riobamba', visits: 8 },
    { name: 'TIXÁN', coords: [-2.15759, -78.76049], canton: 'Alausí', visits: 18 },
    { name: 'TUNSHI', coords: [-1.74749, -78.62639], canton: 'Riobamba', visits: 12 },
    { name: 'CHUNCHI', coords: [-2.27802, -78.5648], canton: 'Chunchi', visits: 11 }
  ];
  

  

  estaciones: any[] = [];

  constructor(private estacionService: EstacionService) {}

  ngOnInit(): void {
    this.initMap();
    this.estacionService.getEstaciones().subscribe({
      next: (data) => {
        this.estaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener estaciones:', err);
      }
    });
  }


  private initMap(): void {
    const map = L.map('map').setView([-1.6785, -78.6569], 9);

    // Capa base de OpenStreetMap
    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

   
    // Capa de etiquetas
    const labelsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap, ©CartoDB'
    });

    // Capa de satelite (Esri)
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri'
    });


    // Añadir marcadores para cada ubicación y evento de clic
    this.locations.forEach(location => {
      const marker = L.marker(location.coords).addTo(map);
      marker.bindTooltip(location.name, { permanent: true, direction: 'top' });

      // Evento para mostrar detalles al hacer clic
      marker.on('click', () => {
        this.showStationDetails(location);
      });
    });

    // Control de capas
    const overlayLayers = {
      'Etiquetas': labelsLayer,
      'Satélite': satelliteLayer
    };

    const baseLayers = {
      'Mapa base': baseLayer
    };

    L.control.layers(baseLayers, overlayLayers).addTo(map);
  }

  private showStationDetails(location: any): void {
    // Actualizar información en el DOM
    document.getElementById('station-name')!.textContent = location.name;
    document.getElementById('station-canton')!.textContent = location.canton;
    document.getElementById('station-lat')!.textContent = location.coords[0].toString();
    document.getElementById('station-lon')!.textContent = location.coords[1].toString();
    document.getElementById('station-visits')!.textContent = location.visits.toString();
  }





  ///////////////////////////////
  isAuthenticated = false;
  usuario: string = '';
  rol: string = '';
  menuAbierto = false;

}
*/