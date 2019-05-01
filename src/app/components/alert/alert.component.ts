import { Component, OnInit, Input } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
import { Alert, AlertType } from '../../model/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() alert: Alert;

  private className: string;
  private showing: boolean = true;
  private hidding: boolean;
  
  readonly autoHideDelay: number = 1000;
  readonly cssAnimationHideDelay: number = 150;

  isErrorAlert: boolean;
  isSuccessAlert: boolean;

  constructor(
    private alertsService: AlertsService,
  ) {}

  ngOnInit(): void {
    this.isErrorAlert = this.alert.type === AlertType.ERROR;
    this.isSuccessAlert = this.alert.type === AlertType.SUCCESS;
    this.className = this.isSuccessAlert ? 'success' : 'error';

    // Autohide in case it has the property autoHide set to true
    this.alert.autoHide && setTimeout(() => this.hide(), this.autoHideDelay);

    // Para que tenga el estado estable (translateY(0))
    setTimeout(() => this.showing = false, this.cssAnimationHideDelay);
  }

  hide(): void {
    this.hidding = true;

    setTimeout(() => this.alertsService.deleteAlert(this.alert.id), this.cssAnimationHideDelay);
  }

  getClasses(): any {
    return {
      [this.className]: true,
      show: this.showing,
      hide: this.hidding,
    };
  }
}
