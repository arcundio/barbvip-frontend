import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../../modelo/otros/alerta';
import { ServicioDTO } from '../../../modelo/admin/servicio-dto';
import { AdministradorService } from '../../../servicios/administrador.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrl: './crear-servicio.component.css'
})
export class CrearServicioComponent implements OnInit{

  servicio !: ServicioDTO
  alerta !: Alerta
  servicioForm !: FormGroup

  constructor(private adminService: AdministradorService, private formBuilder: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario() {
    this.servicioForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required])
    })
  }

  public crearServicio() {
    this.servicio = new ServicioDTO()

    this.servicio.nombre = this.servicioForm.getRawValue()['nombre']
    this.servicio.descripcion = this.servicioForm.getRawValue()['descripcion']
    this.servicio.costo = this.servicioForm.getRawValue()['costo']
    this.servicio.activo = true;

    console.log(this.servicio)

    this.adminService.crearServicio(this.servicio).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })

  }





}
