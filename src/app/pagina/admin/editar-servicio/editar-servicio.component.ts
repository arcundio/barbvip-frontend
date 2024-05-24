import { Component, OnInit } from '@angular/core';
import { ItemServicioDTO } from '../../../modelo/barberia/item-servicio-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../../servicios/administrador.service';
import { error } from 'console';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioDTO } from '../../../modelo/admin/servicio-dto';
import { Alerta } from '../../../modelo/otros/alerta';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrl: './editar-servicio.component.css'
})
export class EditarServicioComponent implements OnInit{

  servicio !: ServicioDTO;
  idServicio: any;
  servicioForm !: FormGroup;
  alerta !: Alerta;

  constructor(private router: Router, private adminServicio: AdministradorService, private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  private crearFormulario() {
    this.servicioForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required]),
      activo: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

    this.crearFormulario()

    this.route.params.subscribe(params => {
      this.idServicio = params['codigo']
      
      this.adminServicio.obtenerServicio(this.idServicio).subscribe({
        next: data => {
          this.servicio = data.respuesta

          this.servicioForm.setValue({
            nombre: this.servicio.nombre,
            descripcion: this.servicio.descripcion,
            costo: this.servicio.costo,
            activo: this.servicio.activo
          })

        },
        error: error => {
          console.log(error.error.respuesta)
        }
      })

    })
  }

  public editarServicio() {
    this.servicio = new ServicioDTO()

    this.servicio.nombre = this.servicioForm.getRawValue()['nombre']
    this.servicio.descripcion = this.servicioForm.getRawValue()['descripcion']
    this.servicio.costo = this.servicioForm.getRawValue()['costo']
    this.servicio.activo = this.servicioForm.getRawValue()['activo']

    console.log(this.servicio)

    this.adminServicio.actualizarServicio(this.servicio, this.idServicio).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })

  }



}
