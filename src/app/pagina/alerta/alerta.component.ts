import { Component, Input } from '@angular/core';
import { Alerta } from '../../modelo/alerta';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {

  @Input() alerta!: Alerta | null;
  public ocultar() {
    this.alerta = null;
  }
  
}
