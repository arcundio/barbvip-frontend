import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { VerCursosComponent } from './pagina/ver-cursos/ver-cursos.component';
import { VerServiciosComponent } from './pagina/ver-servicios/ver-servicios.component';
import { CitasComponent } from './pagina/citas/citas.component';
import { InscripcionesComponent } from './pagina/inscripciones/inscripciones.component';
import { PagoComponent } from './pagina/pago/pago.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { CrearCursoComponent } from './pagina/crear-curso/crear-curso.component';
import { CrearServicioComponent } from './pagina/crear-servicio/crear-servicio.component';
import { GestionServiciosComponent } from './pagina/gestion-servicios/gestion-servicios.component';
import { EditarServicioComponent } from './pagina/editar-servicio/editar-servicio.component';
import { GestionCursosComponent } from './pagina/gestion-cursos/gestion-cursos.component';
import { EditarCursoComponent } from './pagina/editar-curso/editar-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    VerCursosComponent,
    VerServiciosComponent,
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
