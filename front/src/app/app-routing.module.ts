import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { EstacionComponent } from './components/estacion/estacion.component';


import { FormVisitaComponent } from './components/form-visita/form-visita.component';

//admin
import { PanelComponent } from './components/administrador/paginas/panel/panel.component';
import { EstacionesComponent } from './components/administrador/paginas/estaciones/estaciones.component';
import { AuthGuard } from './utils/auth.guard';
import { RoleGuard } from './utils/role.guard';

const routes: Routes = [
{ path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro', component: FormVisitaComponent },

  { path: 'inicio', component: InicioComponent },
  { path: 'estacion', component: EstacionComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },


// Rutas protegidas solo para admin
  {
    path: 'dashboard',
    component: PanelComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'estaciones',
    component: EstacionesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },

  { 
    path: 'perfil', 
    component: PerfilComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
