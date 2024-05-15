import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../modelo/login-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../modelo/alerta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: LoginDTO;
  loginForm !: FormGroup;
  alerta!:Alerta;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
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

}
