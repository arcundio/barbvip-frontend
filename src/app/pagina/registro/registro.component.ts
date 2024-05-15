import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from '../../modelo/usuario-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../modelo/alerta';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  usuario: UsuarioDTO;
  registroForm !: FormGroup;
  alerta!:Alerta;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.usuario = new UsuarioDTO();
  }


  public sonIguales(): boolean {
    const passControl = this.registroForm.get('password');
    const confirmPassControl = this.registroForm.get('confirmaPassword');
    
    if (passControl && confirmPassControl) {
      const pass = passControl.value;
      const confirmPass = confirmPassControl.value;
      return pass == confirmPass
    }

    return false;
  }

  public registrar() {

    const objeto = this

    this.usuario.nombre = this.registroForm.getRawValue()['nombre']
    this.usuario.apellido = this.registroForm.getRawValue()['apellido']
    this.usuario.email = this.registroForm.getRawValue()['email']
    this.usuario.telefono = this.registroForm.getRawValue()['telefono']
    this.usuario.password = this.registroForm.getRawValue()['password']

    this.authService.registrar(this.usuario).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.respuesta, "success")
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger")
      }
    })
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmaPassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

}
