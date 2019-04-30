import { Component } from '@angular/core';
import { AlertsService } from './services/alerts.service';
import { Alert } from './model/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  alerts: Alert[] = [];

  constructor(
    private alertsService: AlertsService,
  ) {}
  
  ngOnInit(): void {
    this.subscribeToAlerts();
  }

  private subscribeToAlerts(): void {
    this.alertsService.alerts$.subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
    });
  }
}
