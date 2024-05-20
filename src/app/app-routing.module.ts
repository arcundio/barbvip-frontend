import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { LoginGuard } from './servicios/permiso.service';
import { CrearCursoComponent } from './pagina/crear-curso/crear-curso.component';
import { RolesGuard } from './guards/roles.service';
import { CrearServicioComponent } from './pagina/crear-servicio/crear-servicio.component';
import { GestionServiciosComponent } from './pagina/gestion-servicios/gestion-servicios.component';
import { EditarServicioComponent } from './pagina/editar-servicio/editar-servicio.component';
import { GestionCursosComponent } from './pagina/gestion-cursos/gestion-cursos.component';
import { EditarCursoComponent } from './pagina/editar-curso/editar-curso.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "registro", component: RegistroComponent, canActivate: [LoginGuard]},
  {path: "crear-curso", component: CrearCursoComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "crear-servicio", component: CrearServicioComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "gestion-servicio", component: GestionServiciosComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "editar-servicio/:codigo", component: EditarServicioComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "gestion-cursos", component: GestionCursosComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "editar-curso/:codigo", component: EditarCursoComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
