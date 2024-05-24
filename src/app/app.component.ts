import { Component } from '@angular/core';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Barberia VIP';

  isLogged = false;
  email: string = "";
  rol:string = "";
  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.rol = this.tokenService.getRole();
      console.log(this.rol)
    }
  }
  public logout() {
    this.tokenService.logout();
  }
}