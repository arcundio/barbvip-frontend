import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../modelo/alerta';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { InscripcionDTO } from '../../modelo/inscripcion-dto';
import { InscripcionesService } from '../../servicios/inscripciones.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent implements OnInit {

  alerta !: Alerta
  inscripciones!: InscripcionDTO[]
  codigoCliente: any

  constructor(private tokenService: TokenService, private clienteService: ClienteService
  ) {

  }
  ngOnInit(): void {

    this.codigoCliente = this.tokenService.getId()

    this.cargarInscripciones()

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




