import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MetodoPagoCitaDTO } from '../../../modelo/cliente/metodo-pago-cita-dto';
import { MetodoPagoDTO } from '../../../modelo/cliente/metodo-pago-dto';
import { Alerta } from '../../../modelo/otros/alerta';
import { MetodoPayDTO } from '../../../modelo/cliente/MetodoPayDTO';
import { TokenService } from '../../../servicios/token.service';

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
 
  metodosPago: MetodoPayDTO[] = [];

  primerNombre: string = "";
  apellido: string = "";

  numero: string = "";
  expiracion: string = "";
  codigoSeguridad: string = "";

  camposHabilitados = true;



  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private tokenService: TokenService) {
    this.cargarMetodosPay();
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.codigo = params['codigo']
      this.tipo = params['tipo'];
    })
    console.log(this.codigo)
    console.log(this.tipo)
  }

  public cargarMetodosPay() {

    this.clienteService.cargarMetodosPay(Number(this.tokenService.getId())).subscribe({
      next: data => {
        this.metodosPago = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public pagar() {

    console.log("primer nombre:" + this.primerNombre)
  
    console.log(this.tokenService.getId())
    if (this.tipo == 'cita') {
      this.metodoPagoCita = new MetodoPagoCitaDTO()
      this.metodoPagoCita.idCita = this.codigo
      this.metodoPagoCita.primerNombre = this.primerNombre
      this.metodoPagoCita.apellido=this.apellido
      this.metodoPagoCita.codigoSeguridad = Number(this.codigoSeguridad)
      this.metodoPagoCita.fechaExpiracion = this.expiracion
      this.metodoPagoCita.numeroTarjeta = Number(this.numero)
      this.metodoPagoCita.idCliente = Number(this.tokenService.getId());
      this.metodoPagoCita.idMetodo = Number(this.codigoMetodoSeleccionado);

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
      this.metodoPagoInscripcion.apellido=this.apellido
      this.metodoPagoInscripcion.codigoSeguridad = Number(this.codigoSeguridad)
      this.metodoPagoInscripcion.fechaExpiracion = this.expiracion
      this.metodoPagoInscripcion.numeroTarjeta = Number(this.numero)
      this.metodoPagoInscripcion.idCliente = Number(this.tokenService.getId());
      this.metodoPagoInscripcion.idMetodo = Number(this.codigoMetodoSeleccionado);

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

  probar(){

    console.log(this.codigoMetodoSeleccionado)

  }

  codigoMetodoSeleccionado: number | null = null;
  metodoSeleccionado: boolean = false;

seleccionarMetodoPago(event: any) {
  const valorSeleccionado = event.target.value;
  
  if (valorSeleccionado === 'Selecciona una tarjeta') {
    this.camposHabilitados = true;
    this.codigoMetodoSeleccionado = 0;
    this.metodoSeleccionado = false;

  } else {
    this.camposHabilitados = false;
    this.metodoSeleccionado = true;
    this.codigoMetodoSeleccionado = Number(valorSeleccionado);
  }
}

}
