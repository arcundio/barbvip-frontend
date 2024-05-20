import { Component } from '@angular/core';
import { Alerta } from '../../modelo/alerta';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import { CursoDTO } from '../../modelo/curso-dto';

@Component({
  selector: 'app-gestion-cursos',
  templateUrl: './gestion-cursos.component.html',
  styleUrl: './gestion-cursos.component.css'
})
export class GestionCursosComponent {
  cursos !: CursoDTO[]
  alerta !: Alerta;

  constructor(private adminServicio: AdministradorService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.adminServicio.listarCursos().subscribe({
      next: data => {
        this.cursos = data.respuesta;
        console.log(this.cursos)
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  public addCurso() {
    this.router.navigate(["crear-curso"]);
  }


}
