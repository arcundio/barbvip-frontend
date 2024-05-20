import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { CursoDTO } from '../../modelo/curso-dto';
import { Alerta } from '../../modelo/alerta';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.css'
})
export class EditarCursoComponent {

  curso !: CursoDTO;
  alerta !: Alerta;
  cursoForm !: FormGroup;
  fechaMinima: any;
  idCurso: any;

  constructor(private adminService: AdministradorService, private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.curso = new CursoDTO()
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.crearFormulario()

    this.route.params.subscribe(params => {
      this.idCurso = params['codigo']

      this.adminService.obtenerCurso(this.idCurso).subscribe({
        next: data => {
          this.curso = data.respuesta

          this.cursoForm.setValue({
            nombre: this.curso.nombre,
            descripcion: this.curso.descripcion,
            costo: this.curso.costo,
            fechaInicio: this.curso.fechaInicio,
            fechaFin: this.curso.fechaFin,
            activo: this.curso.activo
          })

        },
        error: error => {
          console.log(error.error.respuesta)
        }
      })

    })

  }

  private crearFormulario() {
    this.cursoForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      costo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required]),
      activo: new FormControl('', [Validators.required])
    });
  }

  public actualizarCurso() {
    this.curso = new CursoDTO()

    this.curso.nombre = this.cursoForm.getRawValue()['nombre']
    this.curso.descripcion = this.cursoForm.getRawValue()['descripcion']
    this.curso.costo = this.cursoForm.getRawValue()['costo']
    this.curso.fechaFin = this.cursoForm.getRawValue()['fechaFin']
    this.curso.fechaInicio = this.cursoForm.getRawValue()['fechaInicio']
    this.curso.activo = this.cursoForm.getRawValue()['activo']


    this.adminService.actualizarCurso(this.curso, this.idCurso).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }
}
