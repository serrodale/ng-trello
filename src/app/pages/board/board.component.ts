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

  onKeydown(keyCode: number, input: HTMLInputElement): void {
    const value: string = input.value;
    
    // Solo nos interesa la tecla enter y que el valor del input no sea una cadena vacía
    if (keyCode !== 13 || !value.trim()) {
      return;
    }
    
    // TODO: crear lista

    // Reseteamos el valor para que se borre el contenido que había antes
    input.value = '';
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.alertsService.addSuccessAlert(new SuccessAlert('Sesión cerrada'));
  }

}
