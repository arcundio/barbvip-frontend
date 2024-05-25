import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/cliente/registro/registro.component';
import { CitasComponent } from './pagina/cliente/citas/citas.component';
import { InscripcionesComponent } from './pagina/cliente/inscripciones/inscripciones.component';
import { PagoComponent } from './pagina/cliente/pago/pago.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { CrearCursoComponent } from './pagina/admin/crear-curso/crear-curso.component';
import { CrearServicioComponent } from './pagina/admin/crear-servicio/crear-servicio.component';
import { GestionServiciosComponent } from './pagina/admin/gestion-servicios/gestion-servicios.component';
import { EditarServicioComponent } from './pagina/admin/editar-servicio/editar-servicio.component';
import { GestionCursosComponent } from './pagina/admin/gestion-cursos/gestion-cursos.component';
import { EditarCursoComponent } from './pagina/admin/editar-curso/editar-curso.component';
import { GestionarAgendaComponent } from './pagina/admin/gestionar-agenda/gestionar-agenda.component';
import { MenuAdminComponent } from './pagina/admin/menu-admin/menu-admin.component';
import { MenuClienteComponent } from './pagina/cliente/menu-cliente/menu-cliente.component';
import { GestionarPagosComponent } from './pagina/admin/gestionar-pagos/gestionar-pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CitasComponent,
    InscripcionesComponent,
    PagoComponent,
    AlertaComponent,
    CrearCursoComponent,
    CrearServicioComponent,
    GestionServiciosComponent,
    EditarServicioComponent,
    GestionCursosComponent,
    EditarCursoComponent,
    MenuAdminComponent,
    GestionarAgendaComponent,
    MenuClienteComponent,
    GestionarPagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
