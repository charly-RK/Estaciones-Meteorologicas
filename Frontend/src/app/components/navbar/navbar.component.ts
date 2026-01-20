import { Component, OnInit, AfterViewChecked, Renderer2, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  isAuthenticated = false;
  usuario: string = '';
  rol: string = '';
  menuAbierto = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef // Inyectamos ChangeDetectorRef
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

    // Detectar cambios de navegación y restablecer el estado del menú
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuAbierto = false; 
      this.cdr.detectChanges(); 
      this.registerSidebarEvents(); 
    });
  }

  toggleProfileMenu(): void {
    this.menuAbierto = !this.menuAbierto;
    this.toggleSidebar();  // Llamada al método que maneja la apertura/cierre de la barra lateral
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.usuario = '';
    this.menuAbierto = false;
    this.router.navigate(['/login']);
  }

  ngAfterViewChecked(): void {
    // Llamada a registrar eventos después de cada comprobación de vista
    this.registerSidebarEvents();
  }

  private registerSidebarEvents(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const closeBtn = document.querySelector('#btn') as HTMLElement;

    if (closeBtn) {
      this.renderer.listen(closeBtn, 'click', () => this.toggleSidebar());
    }
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const closeBtn = document.querySelector('#btn') as HTMLElement;

    this.menuAbierto = !this.menuAbierto; // Cambiar estado del menú
    if (this.menuAbierto) {
      sidebar?.classList.add('open');  // Añadir clase 'open' para abrir el menú
    } else {
      sidebar?.classList.remove('open');  // Eliminar clase 'open' para cerrar el menú
    }

    // Cambiar ícono del botón
    if (closeBtn) {
      if (this.menuAbierto) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }
}
