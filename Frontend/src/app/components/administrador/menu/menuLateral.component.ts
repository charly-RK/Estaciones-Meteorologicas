import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menuLateral.component.html',
  styleUrls: ['./menuLateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  isAuthenticated = false;
  usuario: string = '';
  rol: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.authService.getPerfilU().subscribe({
        next: (data) => {
          this.usuario = data.nombre || 'Usuario';
          this.rol = data.rol || 'Sin rol';
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.usuario = '';
    this.router.navigate(['/login']);
  }
}
