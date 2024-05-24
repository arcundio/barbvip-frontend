import { Component } from '@angular/core';
import { ItemSolicitudCitaDTO } from '../../../modelo/cliente/ItemSolicitudCitaDTO';
import { ItemInscripcionCursoDTO } from '../../../modelo/cliente/ItemInscripcionCursoDTO';
import { AdministradorService } from '../../../servicios/administrador.service';
import { Alerta } from '../../../modelo/otros/alerta';

@Component({
  selector: 'app-gestionar-pagos',
  templateUrl: './gestionar-pagos.component.html',
  styleUrl: './gestionar-pagos.component.css'
})
export class GestionarPagosComponent {

  citas: ItemSolicitudCitaDTO[];
  inscripciones : ItemInscripcionCursoDTO[];
  alerta!:Alerta;

  constructor(private adminService: AdministradorService){
    this.citas = [];
    this.inscripciones = [];
    this.cargarCitas();
    this.cargarInscripciones();
  }

  public cargarCitas(){

    this.adminService.listarCitas().subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarInscripciones(){

    this.adminService.listarInscripciones().subscribe({
      next: data => {
        this.inscripciones = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
