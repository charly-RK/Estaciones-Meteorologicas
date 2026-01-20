import { Component, OnInit } from '@angular/core';
import { VisitanteService, Visitante } from '../../services/visitas.service';
import { DescargaService } from '../../services/administracion/descarga.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-visita',
  templateUrl: './form-visita.component.html',
  styleUrls: ['./form-visita.component.css']
})
export class FormVisitaComponent implements OnInit {

  usuario: Visitante = {
    nombre: '',
    apellido: '',
    correo: '',
    cedula: '',
    razon_visita: ''
  };

  totalVisitantes: number = 0;
  mensaje: string = '';

  constructor(private visitanteService: VisitanteService,
    private descargaService: DescargaService,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.cargarTotalVisitantes();
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

  cedulaInvalida: boolean = false;

validarCedula(): void {
  const cedula = this.usuario.cedula;

  if (!cedula || cedula.length !== 10 || isNaN(Number(cedula))) {
    this.cedulaInvalida = true;
    return;
  }

  const digitos = cedula.split('').map(Number);
  const codigoProvincia = parseInt(cedula.substring(0, 2));
  if (codigoProvincia < 1 || codigoProvincia > 24) {
    this.cedulaInvalida = true;
    return;
  }

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = digitos[i];
    if (i % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }
    suma += valor;
  }

  const digitoVerificador = (10 - (suma % 10)) % 10;
  this.cedulaInvalida = digitoVerificador !== digitos[9];
}


  onSubmit() {
  this.visitanteService.registrarVisitante(this.usuario).subscribe({
    next: (res) => {
      this.mensaje = '¡Gracias por registrarte!';
      this.usuario = { nombre: '', apellido: '', correo: '', cedula: '', razon_visita: '' };
      this.cargarTotalVisitantes();

      const datos = this.descargaService.getDatos();
      if (datos) {
        const params = new URLSearchParams({
          mes: datos.mes.toString(),
          desde: datos.desde,
          hasta: datos.hasta,
          descargar: 'true',
          ...(datos.esta_id ? { esta_id: datos.esta_id.toString() } : {})
        });

        const url = `http://localhost:3636/api/datalogger?${params.toString()}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `datalogger_${datos.desde}_a_${datos.hasta}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.descargaService.clear(); // limpia los datos
      }

      // ✅ Redirigir al usuario al inicio después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 1000);
    },
    error: (err) => {
      this.mensaje = 'Error al registrar visitante. Intenta nuevamente.';
      console.error(err);
    }
  });
}

}
