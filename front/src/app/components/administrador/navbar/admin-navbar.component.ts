import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit, AfterViewInit {

  usuario: string = '';
  rol: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
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

  perfilOculto = true;
notificacionesOcultas = true;

togglePerfil() {
  this.perfilOculto = !this.perfilOculto;
  this.notificacionesOcultas = true; // cierra notificaciones si se abre perfil
}

toggleNotificaciones() {
  this.notificacionesOcultas = !this.notificacionesOcultas;
  this.perfilOculto = true;
}


  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.usuario = '';
    this.rol = '';
    this.router.navigate(['/inicio']);
  }

  ngAfterViewInit(): void {
    const perfilBtn = document.getElementById('perfil-btn');
    const perfilMenu = document.getElementById('perfil-menu');
    const notiIcon = document.querySelector('[data-tooltip="Notificaciones"]');
    const notiMenu = document.getElementById('notificaciones-menu');
    const searchInput = document.getElementById('searchInput');
    const searchOptions = document.getElementById('search-options');

    perfilBtn?.addEventListener('click', () => {
      perfilMenu?.classList.toggle('hidden');
    });

    notiIcon?.addEventListener('click', () => {
      notiMenu?.classList.toggle('hidden');
    });

    searchInput?.addEventListener('focus', () => {
      searchOptions?.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!perfilBtn?.contains(e.target as Node) && !perfilMenu?.contains(e.target as Node)) {
        perfilMenu?.classList.add('hidden');
      }
      if (!notiIcon?.contains(e.target as Node) && !notiMenu?.contains(e.target as Node)) {
        notiMenu?.classList.add('hidden');
      }
      if (!searchInput?.contains(e.target as Node) && !searchOptions?.contains(e.target as Node)) {
        searchOptions?.classList.add('hidden');
      }
    });
  }
}
