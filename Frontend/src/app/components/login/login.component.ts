import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  correo: string = '';
  contrasena: string = '';
  Mostrarcontrasena: boolean = false; 
  showPassword: boolean = false; 
  loading: boolean = false;

  constructor(private authService: AuthService,
     private router: Router,
     private _userService: UserService,
     private _errorService: ErrorService,
     private toastr: ToastrService,
    
    ) { }

  login(): void {
  if (!this.correo || !this.contrasena) {
    this.toastr.warning('Complete todos los campos', 'Advertencia');
    return;
  }

  this.loading = true;

  this.authService.login(this.correo, this.contrasena).subscribe({
    next: (data) => {
      localStorage.setItem('token', data.token);

      // Obtener el perfil con el token
      this.authService.getPerfil(data.token).subscribe({
        next: (usuario) => {
          localStorage.setItem('user', JSON.stringify(usuario)); 
          this.toastr.success(`Bienvenido`, 'Inicio de sesión exitoso');

          // Redirección según rol
          if (usuario.rol === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/inicio']);
          }

          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toastr.error('No se pudo obtener el perfil del usuario', 'Error');
        }
      });
    },
    error: () => {
      this.loading = false;
      this.toastr.error('Correo o contraseña incorrectos', 'Error');
    }
  });
}

    
    

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.Mostrarcontrasena = !this.Mostrarcontrasena;
  }

}
