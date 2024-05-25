import { Component } from '@angular/core';
import { BarberiaServicio } from '../../servicios/barberia_servicio';
import { CursoDTO } from '../../modelo/admin/curso-dto';
import { Alerta } from '../../modelo/otros/alerta';
import { ServicioDTO } from '../../modelo/admin/servicio-dto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  cursos: CursoDTO[]
  servicios: ServicioDTO[];
  alerta!: Alerta;
  isLoggedIn: boolean = true;

  constructor(private barberia: BarberiaServicio) {
    this.cursos=[]
    this.servicios=[];
    this.cargarCursos()
    this.cargarServicios();
  }

  public cargarCursos(){
  
    this.barberia.listarCursos().subscribe({
      next: data => {
        this.cursos = data.respuesta;
  
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarServicios(){
  
    this.barberia.listarServicios().subscribe({
      next: data => {
        this.servicios = data.respuesta;
  
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
}
