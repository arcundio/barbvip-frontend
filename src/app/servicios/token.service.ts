import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { SesionService } from './sesion.service';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = "AuthService";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private sesionServicio: SesionService, @Inject(PLATFORM_ID) private platformId: Object) { }

  public setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(TOKEN_KEY)
      window.sessionStorage.setItem(TOKEN_KEY, token)
    }
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null
  }


  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
  }

  public getId(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
  }

  public login(token: string) {
    this.setToken(token);
    this.sesionServicio.updateSession(true)
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }

  public logout() {
    window.sessionStorage.clear();
    this.sesionServicio.updateSession(false)
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }
}