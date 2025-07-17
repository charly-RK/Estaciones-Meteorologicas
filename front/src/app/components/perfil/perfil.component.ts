import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = null;
  mensajeError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
     const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.authService.getPerfil(token).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (error) => {
          this.mensajeError = 'Error al obtener el perfil';
        }
      });
    } 
  }
}
