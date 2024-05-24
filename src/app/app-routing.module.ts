import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/cliente/registro/registro.component';
import { CrearCursoComponent } from './pagina/admin/crear-curso/crear-curso.component';
import { CrearServicioComponent } from './pagina/admin/crear-servicio/crear-servicio.component';
import { GestionServiciosComponent } from './pagina/admin/gestion-servicios/gestion-servicios.component';
import { EditarServicioComponent } from './pagina/admin/editar-servicio/editar-servicio.component';
import { GestionCursosComponent } from './pagina/admin/gestion-cursos/gestion-cursos.component';
import { EditarCursoComponent } from './pagina/admin/editar-curso/editar-curso.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { GestionarAgendaComponent } from './pagina/admin/gestionar-agenda/gestionar-agenda.component';
import { GestionarPagosComponent } from './pagina/admin/gestionar-pagos/gestionar-pagos.component';
import { CitasComponent } from './pagina/cliente/citas/citas.component';
import { PagoComponent } from './pagina/cliente/pago/pago.component';
import { InscripcionesComponent } from './pagina/cliente/inscripciones/inscripciones.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "registro", component: RegistroComponent, canActivate: [LoginGuard]},
  {path: "admin/crear-curso", component: CrearCursoComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/crear-servicio", component: CrearServicioComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/gestion-servicios", component: GestionServiciosComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/editar-servicio/:codigo", component: EditarServicioComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/gestion-cursos", component: GestionCursosComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/editar-curso/:codigo", component: EditarCursoComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/gestionar-agenda", component: GestionarAgendaComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "admin/gestionar-pagos", component: GestionarPagosComponent, canActivate: [RolesGuard], data: {expectedRole: ['admin']}},
  {path: "cliente/citas", component: CitasComponent, canActivate: [RolesGuard], data: {expectedRole: ['cliente']}},
  {path: "cliente/pago", component: PagoComponent, canActivate: [RolesGuard], data: {expectedRole: ['cliente']}},
  {path: "cliente/inscripciones", component: InscripcionesComponent, canActivate: [RolesGuard], data: {expectedRole: ['cliente']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
