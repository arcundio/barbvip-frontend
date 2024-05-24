import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoDTO } from '../modelo/admin/curso-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { ServicioDTO } from '../modelo/admin/servicio-dto';
import { EstadoInscripcionDTO } from '../modelo/admin/EstadoInscripcionDTO';
import { EstadoCitaDTO } from '../modelo/admin/EstadoCitaDTO';
import { ItemAgendaDTO } from '../modelo/admin/ItemAgendaDTO';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "http://localhost:8081/api/administrador"

  constructor(private http: HttpClient) { }


  // cursos

  public crearCurso(curso: CursoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-curso`, curso);
  }

  public listarCursos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-cursos`);
  }

  public obtenerCurso(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-curso/${codigo}`);
  }  

  public actualizarCurso(curso: CursoDTO, codigo: number) {
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-curso/${codigo}`, curso);
  }

  // servicios

  public crearServicio(servicio: ServicioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-servicio`, servicio);
  }

  public eliminarServicio(idServicio: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-servicio/${idServicio}`)
  }

  public listarServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-servicios`);
  }

  public obtenerServicio(idServicio: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-servicio/${idServicio}`);
  }

  public actualizarServicio(servicio: ServicioDTO, codigo: number){
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-servicio/${codigo}`, servicio);
  }

  //agenda

  public actualizarAgenda(codigoBarbero: number, agenda : ItemAgendaDTO[]): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/actualizar-agenda/${codigoBarbero}`,agenda);
  }

  public cargarAgenda(idBarbero: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cargar-agenda/${idBarbero}`);
  }
  
  //gestionar pagos

  public listarCitas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-citas`);
  }

  public listarInscripciones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-inscripciones`);
  }

  public cambiarEstadoInscripcion(estadoInscripcion:EstadoInscripcionDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/cambiar-estado-inscripcion`, estadoInscripcion);
  }

  public cambiarEstadoCita(estadoCita:EstadoCitaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/cambiar-estado-cita`, estadoCita);
  }

  

}
