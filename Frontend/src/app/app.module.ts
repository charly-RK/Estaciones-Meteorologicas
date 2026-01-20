import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthComponent } from './components/auth/auth.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EstacionComponent } from './components/estacion/estacion.component';
import { PanelComponent } from './components/administrador/paginas/panel/panel.component';

//admin

import { MenuLateralComponent } from './components/administrador/menu/menuLateral.component';
import { AdminNavbarComponent } from './components/administrador/navbar/admin-navbar.component';
import { FormVisitaComponent } from './components/form-visita/form-visita.component';
import { EstacionesComponent } from './components/administrador/paginas/estaciones/estaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    AuthComponent,
    InicioComponent,
    NavbarComponent,
    EstacionComponent,
    PanelComponent, 
    MenuLateralComponent,
    AdminNavbarComponent,
    FormVisitaComponent,
    EstacionesComponent 
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut:4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }) // Configuración del Toastr
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
