import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { LoginDTO } from '../modelo/barberia/login-dto';
import { UsuarioDTO } from '../modelo/cliente/usuario-dto';
import { CambioPasswordDTO } from '../modelo/barberia/CambioPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8081/api/auth"

  constructor(private http: HttpClient) { }


  public login(sesion: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  public registrar(usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, usuario)
  }

  
  public cambiarPassword(cambiarPassword:CambioPasswordDTO):Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-password`, cambiarPassword);
  }
}
