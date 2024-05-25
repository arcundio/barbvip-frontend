import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from '../../modelo/otros/alerta';
import { CambioPasswordDTO } from '../../modelo/barberia/CambioPasswordDTO';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  alerta!: Alerta
  cambiarPasswordDTO: CambioPasswordDTO;
  email:string = ""

  constructor(private route: ActivatedRoute, private authService: AuthService, private tokenService: TokenService) {
    this.cambiarPasswordDTO = new CambioPasswordDTO;
    this.route.params.subscribe(params => {
      this.email = params['email'];
      
    });
  }

  public cambiarPasssword(){

    this.cambiarPasswordDTO.email=this.email;

    this.authService.cambiarPassword(this.cambiarPasswordDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public sonIguales(): boolean {
    return this.cambiarPasswordDTO.nuevaPassword == this.cambiarPasswordDTO.confirmaPassword;
  }
}
