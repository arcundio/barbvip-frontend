import { Component } from '@angular/core';
import { Alerta } from '../../../modelo/otros/alerta';
import { AdministradorService } from '../../../servicios/administrador.service';
import { Router } from '@angular/router';
import { CursoDTO } from '../../../modelo/admin/curso-dto';

@Component({
  selector: 'app-gestion-cursos',
  templateUrl: './gestion-cursos.component.html',
  styleUrl: './gestion-cursos.component.css'
})
export class GestionCursosComponent {
  cursos !: CursoDTO[]
  alerta !: Alerta;
  auxiliarCursos: CursoDTO[] = [];

  constructor(private adminServicio: AdministradorService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.adminServicio.listarCursos().subscribe({
      next: data => {
        this.cursos = data.respuesta;
        this.auxiliarCursos = Array.from(this.cursos);
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  public addCurso() {
    this.router.navigate(["/admin/crear-curso"]);
  }

  filtrarTabla(event: any){
    let estadoSelecionado = event.target.value;
    if (estadoSelecionado == "") {
      this.auxiliarCursos = this.cursos;
    } else {
      this.auxiliarCursos = this.cursos.filter(c => c.activo == estadoSelecionado);
    }
  }


}
