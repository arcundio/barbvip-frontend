import { Component } from '@angular/core';
import { CursoDTO } from '../../../modelo/admin/curso-dto';
import { Alerta } from '../../../modelo/otros/alerta';
import { InscripcionDTO } from '../../../modelo/inscripcion-dto';
import { TokenService } from '../../../servicios/token.service';
import { BarberiaService } from '../../../servicios/barberia.service';
import { ClienteService } from '../../../servicios/cliente.service';
import { InscripcionCursoDTO } from '../../../modelo/cliente/inscripcion-curso-dto';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {
  cursos !: CursoDTO[];
  alerta !: Alerta
  codigoCliente: any
  codigoCurso: any
  inscripciones!: InscripcionDTO[]

  constructor(private barberiaService: BarberiaService, private tokenService: TokenService,
    private clienteService: ClienteService) {
  }

  ngOnInit(): void {

    this.codigoCliente = this.tokenService.getId()

    this.cargarInscripciones()

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

  public cargarInscripciones() {
    this.clienteService.cargarInscripciones(this.codigoCliente).subscribe({
      next: data => {
        this.inscripciones = data.respuesta
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "warning")
      }
    })
  }
}
