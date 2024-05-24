import { Component } from '@angular/core';
import { ItemSolicitudCitaDTO } from '../../../modelo/cliente/ItemSolicitudCitaDTO';
import { ItemInscripcionCursoDTO } from '../../../modelo/cliente/ItemInscripcionCursoDTO';
import { AdministradorService } from '../../../servicios/administrador.service';
import { Alerta } from '../../../modelo/otros/alerta';
import { EstadoInscripcionDTO } from '../../../modelo/admin/EstadoInscripcionDTO';
import { EstadoCitaDTO } from '../../../modelo/admin/EstadoCitaDTO';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestionar-pagos',
  templateUrl: './gestionar-pagos.component.html',
  styleUrl: './gestionar-pagos.component.css'
})
export class GestionarPagosComponent {

  citas: ItemSolicitudCitaDTO[];
  inscripciones: ItemInscripcionCursoDTO[];
  alerta!: Alerta;
  alerta2!: Alerta;
  estadoInscripcion: EstadoInscripcionDTO = new EstadoInscripcionDTO();
  estadoCita: EstadoCitaDTO = new EstadoCitaDTO();
  botonCambiarEstadoHabilitado:boolean = true;

  constructor(private adminService: AdministradorService, private router: Router) {
    this.citas = [];
    this.inscripciones = [];

    this.cargarCitas();
    this.cargarInscripciones();
  }

  public cargarCitas() {

    this.adminService.listarCitas().subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarInscripciones() {

    this.adminService.listarInscripciones().subscribe({
      next: data => {
        this.inscripciones = data.respuesta;
      },
      error: error => {
        this.alerta2 = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cambiarEstadoInscripcion(inscripcion: ItemInscripcionCursoDTO) {

    if (inscripcion.estado === "PENDIENTE") {
      this.estadoInscripcion.estado = "PAGADO";
    } else {
      this.estadoInscripcion.estado = "PENDIENTE";
    }

    this.estadoInscripcion.idInscripcion = inscripcion.idInscripcion;

    this.adminService.cambiarEstadoInscripcion(this.estadoInscripcion).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

    this.cargarInscripciones();
    this.router.navigate(["/admin/gestionar-pagos"]).then(() => {
      window.location.reload();
    });
  }

  public cambiarEstadoCita(cita: ItemSolicitudCitaDTO) {
    if (cita.estado === "PENDIENTE") {
      this.estadoCita.estado = "PAGADO";
    } else {
      this.estadoCita.estado = "PENDIENTE";
    }

    this.estadoCita.idCita = cita.idCita;

    this.adminService.cambiarEstadoCita(this.estadoCita).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

    this.cargarCitas();
    this.router.navigate(["/admin/gestionar-pagos"]).then(() => {
      window.location.reload();
    });
  }

}
