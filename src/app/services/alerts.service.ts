import { Injectable } from '@angular/core';
import { SuccessAlert, Alert } from '../model/alert.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  
  private alertId: number = 1;
  private alerts: Alert[] = [];
  private alertsSubject: Subject<Alert[]> = new Subject();

  alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  addSuccessAlert(alert: SuccessAlert): void {
    // Asignamos al alert un nuevo id para saber cuál
    alert.id = this.alertId++;

    this.alerts.push(alert);
    this.alertsSubject.next(this.alerts);
  }

  deleteAlert(id: number): void {
    this.alerts = this.alerts.filter((alert: Alert) => alert.id !== id);
    this.alertsSubject.next(this.alerts);
  }

}
