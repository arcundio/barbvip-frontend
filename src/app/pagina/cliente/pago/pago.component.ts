import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente.service';
import { Router } from '@angular/router';
import { BarberiaServicio } from '../../../servicios/barberia_servicio';
import { ItemSolicitudCitaDTO } from '../../../modelo/cliente/ItemSolicitudCitaDTO';
import { ItemInscripcionCursoDTO } from '../../../modelo/cliente/ItemInscripcionCursoDTO';
import { Alerta } from '../../../modelo/otros/alerta';
import { EstadoInscripcionDTO } from '../../../modelo/admin/EstadoInscripcionDTO';
import { EstadoCitaDTO } from '../../../modelo/admin/EstadoCitaDTO';
import { TokenService } from '../../../servicios/token.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {

  citas: ItemSolicitudCitaDTO[];
  inscripciones: ItemInscripcionCursoDTO[];
  alerta!: Alerta;
  alerta2!: Alerta;
  estadoInscripcion: EstadoInscripcionDTO = new EstadoInscripcionDTO();
  estadoCita: EstadoCitaDTO = new EstadoCitaDTO();
  botonCambiarEstadoHabilitado: boolean = true;
  estados: string[];
  estadoSeleccionadoCita: string = ''
  estadoSeleccionadoInscripcion: string = ''
  auxiliarCitas: ItemSolicitudCitaDTO[];
  auxiliarInscripciones: ItemInscripcionCursoDTO[];

  constructor(private clienteService: ClienteService, private router: Router, private barberiaService: BarberiaServicio,
    private tokenService: TokenService
  ) {
    this.citas = [];
    this.inscripciones = [];
    this.estados = [];
    this.auxiliarCitas = [];
    this.auxiliarInscripciones = [];
    this.cargarCitas();
    this.cargarInscripciones();
    this.cargarEstados();
  }



  public cargarEstados() {

    this.barberiaService.listarEstados().subscribe({
      next: data => {
        this.estados = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarCitas() {

    this.clienteService.cargarCitas(Number(this.tokenService.getId())).subscribe({
      next: data => {
        this.citas = data.respuesta;
        this.auxiliarCitas = Array.from(this.citas);
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarInscripciones() {

    this.clienteService.cargarInscripciones(Number(this.tokenService.getId())).subscribe({
      next: data => {
        this.inscripciones = data.respuesta;
        this.auxiliarInscripciones = Array.from(this.inscripciones);
      },
      error: error => {
        this.alerta2 = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }


  seleccionarEstado() {
    console.log("Estado seleccionado: " + this.estadoSeleccionadoInscripcion)
  }

  filtrarTablaCita(event: any) {
    let estadoSelecionado = event.target.value;
    if (estadoSelecionado == "") {
      this.auxiliarCitas = this.citas;
    } else {
      this.auxiliarCitas = this.citas.filter(c => c.estado == estadoSelecionado);
    }
  }

  filtrarTablaInscripcion(event: any) {
    let estadoSelecionado = event.target.value;
    if (estadoSelecionado == "") {
      this.auxiliarInscripciones = this.inscripciones;
    } else {
      this.auxiliarInscripciones = this.inscripciones.filter(i => i.estado == estadoSelecionado);
    }
  }

  redireccion() {
    
  }

}
