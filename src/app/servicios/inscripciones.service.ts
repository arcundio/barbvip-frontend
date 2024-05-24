import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { InscripcionDTO } from '../modelo/inscripcion-dto';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripcionesSubject = new BehaviorSubject<any[]>([]);
  inscripciones$ = this.inscripcionesSubject.asObservable();

  constructor() { }

  actualizarInscripciones(inscripciones: InscripcionDTO[]) {
    this.inscripcionesSubject.next(inscripciones);
  }
}
