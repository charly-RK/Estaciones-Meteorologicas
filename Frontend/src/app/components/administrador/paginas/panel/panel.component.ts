import { Component, OnInit } from '@angular/core';
import { AdminEstacionesService } from '../../../../services/administracion/adminestaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  estaciones: any[] = [];
  estacionesFiltradas: any[] = [];
  filtro: string = '';
  loading: boolean = true;
  editIndex: number | null = null; 
  tiposEstacion: any[] = [];
  

  // Modal y formulario de creación
  showModal: boolean = false;
  provincias: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];

  nuevaEstacion: any = {
    tipoesta_id: '',
    esta_nombre: '',
    esta_ubicacion: '',
    esta_latitud: '',
    esta_longitud: '',
    esta_alturaterreno: '',
    esta_promotorterreno: '',
    esta_propietarioinstitucion: '',
    esta_institucionacargo: '',
    esta_manualautomatica: '',
    esta_codigoinamhi: '',
    esta_path: '',
    esta_comunidad: '',
    esta_nombrearchivo: '',
    esta_path_leidos: '',
    parr_id: ''
  };

  constructor(private estacionesService: AdminEstacionesService) {}

  ngOnInit(): void {
    this.obtenerEstaciones();
    this.cargarProvincias();
    this.cargarTiposEstacion();
    
  }

  cargarTiposEstacion(): void {
  this.estacionesService.getTiposEstacion().subscribe({
    next: (data) => {
      this.tiposEstacion = data;
    },
    error: (err) => {
      console.error('Error al cargar tipos de estación:', err);
    }
  });
}

  obtenerEstaciones(): void {
    this.estacionesService.getAllEstaciones().subscribe({
      next: (data) => {
        this.estaciones = data;
        this.filtrarEstaciones(); // aplicar filtro inicial
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener estaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las estaciones', 'error');
        this.loading = false;
      }
    });
  }

   // === MODAL LOGIC ===
  abrirModal(): void {
    this.showModal = true;
    this.cargarProvincias();
  }

  cerrarModal(): void {
    this.showModal = false;
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.nuevaEstacion = {
      tipoesta_id: '',
      esta_nombre: '',
      esta_ubicacion: '',
      esta_latitud: '',
      esta_longitud: '',
      esta_alturaterreno: '',
      esta_promotorterreno: '',
      esta_propietarioinstitucion: '',
      esta_institucionacargo: '',
      esta_manualautomatica: '',
      esta_codigoinamhi: '',
      esta_path: '',
      esta_comunidad: '',
      esta_nombrearchivo: '',
      esta_path_leidos: '',
      parr_id: ''
    };
    this.cantones = [];
    this.parroquias = [];
  }

cargarProvincias(): void {
  console.log('>> Ejecutando cargarProvincias...');
  this.estacionesService.getProvincias().subscribe({
    next: data => {
      console.log('Provincias recibidas completas:', data);
      this.provincias = data.provincias;
      console.log('Solo array provincias:', this.provincias);
    },
    error: err => console.error('Error al cargar provincias:', err)
  });
}



onProvinciaChange(event: Event): void {
  const provId = Number((event.target as HTMLSelectElement).value);
  console.log('Provincia seleccionada ID:', provId);
  this.estacionesService.getCantones(provId).subscribe({
    next: data => {
      console.log('Cantones recibidos:', data);
      this.cantones = data;
      this.parroquias = [];
      this.nuevaEstacion.parr_id = '';
    },
    error: err => console.error('Error al cargar cantones:', err)
  });
}


onCantonChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const cantId = Number(target.value);
  if (!cantId) return;
  this.estacionesService.getParroquias(cantId).subscribe(data => {
    this.parroquias = data;
  });
}


  crearEstacion(): void {
    if (!this.nuevaEstacion.parr_id || !this.nuevaEstacion.esta_nombre) {
      Swal.fire('Error', 'Completa los campos obligatorios.', 'warning');
      return;
    }

    this.estacionesService.createEstacion(this.nuevaEstacion).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Estación creada correctamente', 'success');
        this.obtenerEstaciones(); // recargar lista
        this.cerrarModal();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear la estación', 'error');
      }
    });
  }

  filtrarEstaciones(): void {
    const search = this.filtro.toLowerCase().trim();
    this.estacionesFiltradas = this.estaciones.filter(est =>
      est.esta_nombre?.toLowerCase().includes(search) ||
      est.esta_id?.toString().includes(search)
    );
  }

  editarEstacion(index: number): void {
    this.editIndex = index;
  }

  cancelarEdicion(): void {
    this.editIndex = null;
    this.obtenerEstaciones(); // recargar datos para descartar cambios locales
  }

  actualizarEstacion(estacion: any): void {
    this.estacionesService.updateEstacion(estacion.esta_id, estacion).subscribe({
      next: (res) => {
        Swal.fire('Actualizado', 'La estación se actualizó correctamente', 'success');
        this.editIndex = null;
        this.obtenerEstaciones();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar la estación', 'error');
      }
    });
  }

  eliminarEstacion(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estacionesService.deleteEstacion(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La estación fue eliminada.', 'success');
            this.obtenerEstaciones();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo eliminar la estación', 'error');
          }
        });
      }
    });
  }
}
