import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { LoginDTO } from '../modelo/login-dto';
import { UsuarioDTO } from '../modelo/usuario-dto';

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
}
