import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  errorMessage: string = ''; 
  passwordError: string = '';  // Agregamos esta propiedad
  loading: boolean = false; 

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private _errorService: ErrorService) {}

  register(): void {
    // Validamos que el usuario ingrese valores
    if (this.nombre == '' || this.apellido == '' || this.correo == '' || this.contrasena == '' || this.confirmarContrasena == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validar que el nombre y el apellido no contengan números
    if (/[\d]/.test(this.nombre) || /[\d]/.test(this.apellido)) {
      this.toastr.error('El nombre y apellido no deben contener números', 'Error');
      return;
    }

    // Validar formato del correo
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.correo)) {
      this.toastr.error('Por favor ingrese un correo electrónico válido', 'Error');
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.contrasena !== this.confirmarContrasena) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Reiniciar el mensaje de error
    this.loading = true;

    // Llamar al servicio de registro
    this.authService.register(this.nombre, this.apellido, this.correo, this.contrasena, this.confirmarContrasena).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.nombre} fue registrado con éxito`, 'Usuario registrado');
        this.router.navigate(['/login']); 
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = e.error.msg || 'Error al registrar usuario';
        this._errorService.msjError(e);
      }
    });
  }

  togglePasswordVisibility(field: string) {
    const passwordField = document.getElementById(field) as HTMLInputElement;
    const icon = passwordField.nextElementSibling as HTMLElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.setAttribute('name', 'eye-outline'); 
    } else {
      passwordField.type = 'password';
      icon.setAttribute('name', 'eye-off-outline'); 
    }
  }

  // Método para validar la contraseña mientras el usuario escribe
  validatePassword(): void {
    if (this.contrasena.length < 8) {
      this.passwordError = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!/[A-Z]/.test(this.contrasena)) {
      this.passwordError = 'La contraseña debe contener al menos una letra mayúscula.';
    } else if (!/[0-9]/.test(this.contrasena)) {
      this.passwordError = 'La contraseña debe contener al menos un número.';
    } else {
      this.passwordError = ''; // No hay errores
    }
  }
}
