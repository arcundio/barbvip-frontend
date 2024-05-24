import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../modelo/otros/alerta';
import { ServicioDTO } from '../../modelo/admin/servicio-dto';
import { ItemBarberoCitaDTO } from '../../modelo/item-barbero-cita-dto';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

  fecha: string = "";
  alerta !: Alerta;
  items !: ItemBarberoCitaDTO[]
  servicios: ServicioDTO[] = []
  idCliente!: string

  constructor(private clienteService: ClienteService, private tokenService: TokenService) {

  }
  ngOnInit(): void {

    this.idCliente = this.tokenService.getId()

    this.clienteService.cargarCitas(this.idCliente).subscribe({
      next: data => {
        this.servicios = data.respuesta
      },
      error: error => 
        this.alerta = new Alerta(error.error.respuesta, "danger") 
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
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  public seleccionar(item: ItemBarberoCitaDTO) {
    this.idBarbero = item.codigoBarbero
    console.log(this.idBarbero)
  }

  onCheckboxChange(event: any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.selectedCheckboxCount = checkboxes.length;

    if (this.selectedCheckboxCount > 1) {
      event.target.checked = false;
    }

  }

}
