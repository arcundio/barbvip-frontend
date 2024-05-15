import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { LoginGuard } from './servicios/permiso.service';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "registro", component: RegistroComponent, canActivate: [LoginGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
