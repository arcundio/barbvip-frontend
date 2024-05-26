import { Component } from '@angular/core';
import { Alerta } from '../../../modelo/otros/alerta';
import { ItemBarberoCitaDTO } from '../../../modelo/item-barbero-cita-dto';
import { ClienteService } from '../../../servicios/cliente.service';
import { TokenService } from '../../../servicios/token.service';
import { BarberiaService } from '../../../servicios/barberia.service';
import { ItemSolicitudCitaDTO } from '../../../modelo/cliente/ItemSolicitudCitaDTO';
import { ItemServicioDTO } from '../../../modelo/barberia/item-servicio-dto';
import { SolicitudCitaDTO } from '../../../modelo/cliente/solicitud-cita-dto';
import { nextTick } from 'process';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {

  fecha: string = "";
  alerta !: Alerta;
  alerta2 !: Alerta;
  items !: ItemBarberoCitaDTO[]
  servicios: ItemServicioDTO[] = []
  serviciosSeleccionados: ItemServicioDTO[] = []
  idCliente!: string
  listaIds: number[] = []
  hora: string = ""

  // servicios a enviar 
  servicioEnviar !: SolicitudCitaDTO 
  selectedCheckbox: HTMLInputElement | null = null


  constructor(private clienteService: ClienteService, private tokenService: TokenService, private barberiaService: BarberiaService) {

  }

  ngOnInit(): void {

    this.idCliente = this.tokenService.getId()


    this.barberiaService.listarServicios().subscribe({
      next: data => {
        this.servicios = data.respuesta
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "warning")
      }
    })

  }

  selectedCheckboxCount: number = 0;
  idBarbero: number = 0;

  public filtrarBarberoCita() {
    this.clienteService.filtrarBarberoCita(this.fecha).subscribe({
      next: data => {
        this.items = data.respuesta
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "warning")
      }
    })
  }

  public seleccionar(item: ItemBarberoCitaDTO) {
    this.idBarbero = item.codigoBarbero
    this.hora = item.hora
    console.log(this.idBarbero)
  }

  onCheckboxChange(event: any, item: ItemBarberoCitaDTO) {
    const checkbox = event.target as HTMLInputElement;
  
    if (checkbox.checked) {
      // Si se marca el checkbox
      if (this.selectedCheckbox && this.selectedCheckbox !== checkbox) {
        // Si hay un checkbox seleccionado anteriormente y es diferente al actual, desmarcar el anterior
        this.selectedCheckbox.checked = false;
      }
  
      // Asignar el código de barbero y la hora correspondientes
      this.idBarbero = item.codigoBarbero;
      this.hora = item.hora;
      this.selectedCheckbox = checkbox;
    } else {
      // Si se desmarca el checkbox
      if (this.selectedCheckbox === checkbox) {
        // Si el checkbox desmarcado es el mismo que el seleccionado actualmente
        this.idBarbero = 0;
        this.hora = "";
        this.selectedCheckbox = null;
      }
    }
  }

  solicitarCita() {

    this.servicioEnviar = new SolicitudCitaDTO()
    this.servicioEnviar.idCliente = Number(this.idCliente)
    this.servicioEnviar.idBarbero = this.idBarbero
    this.servicioEnviar.fecha = this.fecha
    this.servicioEnviar.hora = this.hora
    this.servicioEnviar.servicios = this.listaIds

    this.clienteService.solicitarCita(this.servicioEnviar).subscribe({
      next: data => {
        this.alerta2 = new Alerta(data.respuesta, "success")
      },
      error: error => {
        this.alerta2 = new Alerta(error.error.respuesta, "danger")
      }
    })

    console.log(this.listaIds)
  }

  actualizarServiciosSeleccionados() {
    this.serviciosSeleccionados = this.servicios.filter(servicio => servicio.seleccionado)
    this.listaIds = this.serviciosSeleccionados.map(servicio => servicio.idServicio)
  } 
}
