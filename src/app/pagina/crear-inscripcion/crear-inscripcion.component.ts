import { Component, OnInit } from '@angular/core';
import { CursoDTO } from '../../modelo/curso-dto';
import { BarberiaService } from '../../servicios/barberia.service';
import { Alerta } from '../../modelo/alerta';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { InscripcionCursoDTO } from '../../modelo/inscripcion-curso-dto';
import { InscripcionesService } from '../../servicios/inscripciones.service';
import { InscripcionDTO } from '../../modelo/inscripcion-dto';
import { InscripcionesComponent } from '../inscripciones/inscripciones.component';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrl: './crear-inscripcion.component.css'
})
export class CrearInscripcionComponent implements OnInit {

  cursos !: CursoDTO[];
  alerta !: Alerta
  codigoCliente: any
  codigoCurso: any
  inscripciones!: InscripcionDTO[]

  constructor(private barberiaService: BarberiaService, private tokenService: TokenService,
    private clienteService: ClienteService, private inscripcionComponent: InscripcionesComponent) {
  }

  ngOnInit(): void {

    this.codigoCliente = this.tokenService.getId()

    this.barberiaService.listarCursos().subscribe({
      next: data => {
        this.cursos = data.respuesta
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }


  public inscribir() {
    if (this.codigoCliente && this.codigoCurso) {

      const inscripcion = new InscripcionCursoDTO()
      inscripcion.idCliente = this.codigoCliente
      inscripcion.idCurso = this.codigoCurso

      this.clienteService.inscribirCurso(inscripcion).subscribe({
        next: data => {
          this.alerta = new Alerta(data.respuesta, "success")
          window.location.reload()
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger")
        }
      })
    }
    
  }

}
