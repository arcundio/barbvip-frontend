import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';

@Injectable({
    providedIn: 'root'
})
export class BarberiaServicio {

    private barberiaURL = "https://software-5ncs.onrender.com/api/barberia"

    constructor(private http: HttpClient) { }

    // cursos
    public listarCursos(): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.barberiaURL}/listar-cursos`);
    }

    // servicios

    public listarServicios(): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.barberiaURL}/listar-servicio`);
    }

    //estados

    public listarEstados(): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.barberiaURL}/estados`);
    }

    public enviarLinkRecuperacion(email: string): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.barberiaURL}/enviar-link-recuperacion/${email}`);
    }


}
