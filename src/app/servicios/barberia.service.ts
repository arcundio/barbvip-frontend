import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class BarberiaService {

  private barURL = "http://localhost:8081/api/barberia"

  constructor(private http: HttpClient) { 
  }

  public cargarEstados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.barURL}/estados`)
  }

  public listarCursos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.barURL}/listar-cursos`)
  }

  public listarServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.barURL}/listar-servicio`)
  }

}
