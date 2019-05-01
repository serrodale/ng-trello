import { Component } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Alert } from './model/alert.model';
import { Modal } from './model/modal.model';
import { ModalsService } from './services/modals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  modals: Modal[] = [];
  alerts: Alert[] = [];

  constructor(
    private alertsService: AlertsService,
    private modalsService: ModalsService,
  ) {}
  
  ngOnInit(): void {
    this.subscribeToModals();
    this.subscribeToAlerts();
  }

  private subscribeToModals(): void {
    this.modalsService.modals$.subscribe((modals: Modal[]) => {
      this.modals = modals;
    });
  }

  private subscribeToAlerts(): void {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
    });
  }
}
