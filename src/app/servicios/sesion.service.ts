import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private messageSource = new BehaviorSubject<any>(0);
  currentMessage: Observable<any>;

  constructor() {
    this.currentMessage = this.messageSource.asObservable();
  }

  public updateSession(data: boolean) { 
    this.messageSource.next(data);
  }

  public updateRole(data: string) {
    this.messageSource.next(data)
  }
}
