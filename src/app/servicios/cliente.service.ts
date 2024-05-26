import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { SolicitudCitaDTO } from '../modelo/cliente/solicitud-cita-dto';
import { InscripcionCursoDTO } from '../modelo/cliente/inscripcion-curso-dto';
import { MetodoPagoDTO } from '../modelo/cliente/metodo-pago-dto';
import { MetodoPagoCitaDTO } from '../modelo/cliente/metodo-pago-cita-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "http://localhost:8081/api/clientes"

  constructor(private http: HttpClient) { 
  }

  public solicitarCita(solicitud: SolicitudCitaDTO): Observable<MensajeDTO> { 
    return this.http.post<MensajeDTO>(`${this.clienteURL}/solicitar-cita`, solicitud)
  }

  public inscribirCurso(inscripcion: InscripcionCursoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/inscribir-curso`, inscripcion)
  }

  public cargarInscripciones(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/cargar-inscripciones/${codigo}`)
  }

  public cargarCitas(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/cargar-citas/${codigo}`)
  }

  public pagarCita(metodo: MetodoPagoCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/pagar-cita`, metodo)
  }

  public filtrarBarberoCita(fecha: any): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/filtrar-barbero-cita/${fecha}`)
  }

  public pagarInscripcion(metodo: MetodoPagoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/pagar-inscripcion`, metodo)
  }



  
}
