import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { CursoDTO } from '../../../modelo/admin/curso-dto';
import { Alerta } from '../../../modelo/otros/alerta';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.css'
})
export class CrearCursoComponent implements OnInit {

  curso !: CursoDTO;
  alerta !: Alerta;
  cursoForm !: FormGroup;
  fechaMinima : any;

  constructor(private adminService: AdministradorService, private formBuilder: FormBuilder) {
    this.curso = new CursoDTO()
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario() {
    this.cursoForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      costo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    });
  }

  public crearCurso() {

    const objeto = this
    this.curso.nombre = this.cursoForm.getRawValue()['nombre']
    this.curso.activo = 1
    this.curso.costo = this.cursoForm.getRawValue()['costo']
    this.curso.descripcion = this.cursoForm.getRawValue()['descripcion']
    this.curso.fechaInicio = this.cursoForm.getRawValue()['fechaInicio']
    this.curso.fechaFin = this.cursoForm.getRawValue()['fechaFin']

    console.log(this.curso)

    this.adminService.crearCurso(this.curso).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

}
