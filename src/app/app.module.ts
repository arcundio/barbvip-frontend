import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { VerCursosComponent } from './pagina/ver-cursos/ver-cursos.component';
import { VerServiciosComponent } from './pagina/ver-servicios/ver-servicios.component';
import { CitasComponent } from './pagina/citas/citas.component';
import { InscripcionesComponent } from './pagina/inscripciones/inscripciones.component';
import { PagoComponent } from './pagina/pago/pago.component';

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
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
