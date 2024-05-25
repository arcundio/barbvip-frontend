import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../modelo/barberia/login-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../modelo/otros/alerta';
import { AppComponent } from '../../app.component';
import { BarberiaServicio } from '../../servicios/barberia_servicio';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: LoginDTO;
  loginForm !: FormGroup;
  alerta!:Alerta;
  mostrarMensaje:string ="";
  mostrarMess:boolean=false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService, private barberiaService: BarberiaServicio) {
    this.login = new LoginDTO("", "");
  }

  loguearse() {
    const objeto = this;
    this.authService.login(this.login).subscribe({
      next: data => {
        console.log("Data: ", data.respuesta)
        objeto.tokenService.login(data.respuesta.token);
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
    console.log(this.login)
  }

  enviarLinkRecuperacion(event: Event) {
    event.preventDefault();

    if(this.login.email==""){
      this.mostrarMess=true;
      this.mostrarMensaje="Debes ingresar el correo si quieres recuperar la cuenta"
      
    }else{
      this.mostrarMess=false;
      let email : string = this.login.email;

      this.barberiaService.enviarLinkRecuperacion(email).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
    }

   
  }

}
