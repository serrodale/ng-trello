import { Component, Input } from '@angular/core';
import { List } from 'src/app/model/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list: List;

  isLoading: boolean;

  constructor(
    private listsService: ListsService,
    private alertsService: AlertsService,
  ) {
    this.modifyList = this.modifyList.bind(this);
  }

  modifyList(name: string): void {
    this.isLoading = true;

    this.listsService.modifyList(this.list.id, name).subscribe(_ => {
      // Para evitar parpadeos por si llega la respuesta muy rápido del servidor
      setTimeout(() => {
        this.isLoading = false;
        this.alertsService.addSuccessAlert(new SuccessAlert('Lista modificada'));
      }, 500);
    });
  }

}
