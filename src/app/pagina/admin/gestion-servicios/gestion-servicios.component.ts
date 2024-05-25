import { Component, OnInit, Type } from '@angular/core';
import { ItemServicioDTO } from '../../../modelo/barberia/item-servicio-dto';
import { AdministradorService } from '../../../servicios/administrador.service';
import { Alerta } from '../../../modelo/otros/alerta';
import { Router } from '@angular/router';




@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrl: './gestion-servicios.component.css'
})

export class GestionServiciosComponent implements OnInit{

  servicios !: ItemServicioDTO[]
  alerta !: Alerta;
  auxiliarServicios: ItemServicioDTO[] = []

  constructor(private adminServicio: AdministradorService, private router: Router) {

  }
  ngOnInit(): void {
    this.adminServicio.listarServicios().subscribe({
      next: data => {
        this.servicios = data.respuesta;
        this.auxiliarServicios = Array.from(this.servicios);
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  public addServicio() {
    this.router.navigate(["/admin/crear-servicio"]);
  }

  public eliminarServicio(servicio: ItemServicioDTO) {
    this.adminServicio.eliminarServicio(servicio.idServicio).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  filtrarTabla(event: any){
    let estadoSelecionado = event.target.value;
    if (estadoSelecionado == "") {
      this.auxiliarServicios = this.servicios;
    } else {
      this.auxiliarServicios = this.servicios.filter(s => s.activo == estadoSelecionado);
    }
  }




}
