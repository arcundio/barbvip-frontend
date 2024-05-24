import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'barbvip';
  isLogged = false;
  email: string = "";
  isAdmin: boolean = false;

  constructor(private tokenService: TokenService, private sesionService: SesionService) {

  }

  ngOnInit(): void {

    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());

    if (this.tokenService.getRole() == 'admin') {
      this.isAdmin = true;
    }
    
  }


  private async actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.email = this.tokenService.getEmail();
    } else {
      this.email = "";
    }
  }


  public logout() {
    this.tokenService.logout()
  }


}
