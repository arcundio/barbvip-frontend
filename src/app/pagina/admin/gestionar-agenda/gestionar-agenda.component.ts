import { Component } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { Router } from '@angular/router';
import { ItemAgendaDTO } from '../../../modelo/admin/ItemAgendaDTO';
import { Alerta } from '../../../modelo/otros/alerta';

@Component({
  selector: 'app-gestionar-agenda',
  templateUrl: './gestionar-agenda.component.html',
  styleUrl: './gestionar-agenda.component.css'
})
export class GestionarAgendaComponent {

  agendas: ItemAgendaDTO[] = [];
  agenda: ItemAgendaDTO = new ItemAgendaDTO();
  auxiliarAgendas: ItemAgendaDTO[] = []
  alerta!: Alerta

  constructor(private adminServicio: AdministradorService, private router: Router) {

  }

  public seleccionarFila(item: ItemAgendaDTO) {
    this.agenda.idBarbero = item.idBarbero;
    this.agenda.dia = item.dia;
    this.agenda.idAgenda = item.idAgenda;
    this.agenda.horaEntrada = item.horaEntrada;
    this.agenda.horaSalida = item.horaSalida;
  }

  buscarAgenda() {

    this.adminServicio.cargarAgenda(this.agenda.idBarbero).subscribe({
      next: data => {
        this.agendas = data.respuesta;
      },
      error: error => {
        this.agendas=[]
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  agregarAgenda() {
    if (this.verificarDia(this.agenda.dia)) {
      this.agendas.push({
        idAgenda: -1,
        idBarbero: this.agenda.idBarbero,
        dia: this.agenda.dia,
        horaEntrada: this.agenda.horaEntrada,
        horaSalida: this.agenda.horaSalida,
      });
    }
  }

  actualizarAgenda() {
    this.auxiliarAgendas = Array.from(this.agendas)


    for (let i = 0; i < this.auxiliarAgendas.length; i++) {
      if (this.auxiliarAgendas[i].dia === this.agenda.dia) {
        this.auxiliarAgendas[i].idBarbero = this.agenda.idBarbero;
        this.auxiliarAgendas[i].idAgenda = this.agenda.idAgenda;
        this.auxiliarAgendas[i].dia = this.agenda.dia;
        this.auxiliarAgendas[i].horaEntrada = this.agenda.horaEntrada;
        this.auxiliarAgendas[i].horaSalida = this.agenda.horaSalida;
      }
    }

    this.agendas = Array.from(this.auxiliarAgendas)
  }


  public verificarDia(dia: string): boolean {

    for (let i = 0; i < this.agendas.length; i++) {
      if (this.agendas[i].dia == dia) {
        return false;
      }
    }
    return true;
  }

  eliminarAgenda() {

    this.auxiliarAgendas = Array.from(this.agendas)
    this.auxiliarAgendas = this.auxiliarAgendas.filter(item => this.agenda.dia !== item.dia)

    this.agendas = Array.from(this.auxiliarAgendas)

  }

  actualizar() {

    this.adminServicio.actualizarAgenda(this.agenda.idBarbero, this.agendas).subscribe({
      next: data => {
        this.router.navigate(["/admin/gestionar-agenda"]).then(() => {
          window.location.reload();
        });
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

    this.router.navigate(["/admin/gestionar-agenda"]).then(() => {
      window.location.reload();
    });

  }

}