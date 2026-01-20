import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { VisitasService } from '../../services/visitas.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  usuariosRecientes: any[] = [];
  error: string | null = null;

  //vistas
  totalVisitas: number = 0;
  visitasRecientes: any[] = [];

  constructor(private userService: UserService,
    private authService: AuthService,
    private visitasService: VisitasService
  ) {}

  ngOnInit(): void {
    this.loadRecentUsers();

    //

    this.visitasService.getVisitas().subscribe(data => {
      this.totalVisitas = data.totalVisitas;
      this.visitasRecientes = data.recientes;
    });
  }

  loadRecentUsers(): void {
    this.userService.getRecentUsers(10).subscribe({
      next: (data) => {
        // Calcula el tiempo transcurrido para cada usuario
        this.usuariosRecientes = data.map((user) => ({
          ...user,
          
          tiempoActivo: this.calculateTimeElapsed(user.fecha_registro),
        }));
      },
      error: (err) => (this.error = 'Error al cargar los usuarios recientes'),
    });
  }

  calculateTimeElapsed(dateString: string): string {
    const fechaRegistro = new Date(dateString);
    const ahora = new Date();
    const diferencia = Math.floor((ahora.getTime() - fechaRegistro.getTime()) / 1000); // Diferencia en segundos

    if (diferencia < 60) {
      return `hace ${diferencia} segundos`;
    } else if (diferencia < 3600) {
      const minutos = Math.floor(diferencia / 60);
      return `hace ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    } else if (diferencia < 86400) {
      const horas = Math.floor(diferencia / 3600);
      return `hace ${horas} hora${horas !== 1 ? 's' : ''}`;
    } else {
      const dias = Math.floor(diferencia / 86400);
      return `hace ${dias} día${dias !== 1 ? 's' : ''}`;
    }
  }

}
