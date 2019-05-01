import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private authenticationService: AuthenticationService,
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.alertsService.addSuccessAlert(new SuccessAlert('Sesión cerrada'));
  }

}
