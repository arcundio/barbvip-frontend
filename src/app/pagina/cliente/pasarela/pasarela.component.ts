import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MetodoPagoCitaDTO } from '../../../modelo/cliente/metodo-pago-cita-dto';
import { MetodoPagoDTO } from '../../../modelo/cliente/metodo-pago-dto';
import { Alerta } from '../../../modelo/otros/alerta';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrl: './pasarela.component.css'
})
export class PasarelaComponent implements OnInit{

  codigo: number = 0
  tipo: string = ""
  metodoPagoCita : MetodoPagoCitaDTO = new MetodoPagoCitaDTO()
  metodoPagoInscripcion !: MetodoPagoDTO
  alerta !: Alerta

  primerNombre: string = "";
  numero: string = "";
  expiracion: string = "";
  codigoSeguridad: string = "";

  constructor(private clienteService: ClienteService, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.codigo = params['codigo']
      this.tipo = params['tipo'];
    })
    console.log(this.codigo)
    console.log(this.tipo)
  }

  public pagar() {

    console.log("primer nombre:" + this.primerNombre)
  

    if (this.tipo == 'cita') {
      this.metodoPagoCita = new MetodoPagoCitaDTO()
      this.metodoPagoCita.idCita = this.codigo
      this.metodoPagoCita.primerNombre = this.primerNombre
      this.metodoPagoCita.codigoSeguridad = Number(this.codigoSeguridad)
      this.metodoPagoCita.fechaExpiracion = this.expiracion
      this.metodoPagoCita.numeroTarjeta = Number(this.numero)

      console.log(this.metodoPagoCita)

      this.clienteService.pagarCita(this.metodoPagoCita).subscribe({
        next: data => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger")
        }
      }) 

    } else if (this.tipo == 'inscripcion') {
      this.metodoPagoInscripcion = new MetodoPagoDTO()

      this.metodoPagoInscripcion.idInscripcion = this.codigo
      this.metodoPagoInscripcion.primerNombre = this.primerNombre
      this.metodoPagoInscripcion.codigoSeguridad = Number(this.codigoSeguridad)
      this.metodoPagoInscripcion.fechaExpiracion = this.expiracion
      this.metodoPagoInscripcion.numeroTarjeta = Number(this.numero)

      this.clienteService.pagarInscripcion(this.metodoPagoInscripcion).subscribe({
        next: data => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger")
        }
      })
    }
    
    
  }
}
