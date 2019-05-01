import { Component, Input } from '@angular/core';
import { List } from 'src/app/model/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';
import { DropdownOption } from 'src/app/model/dropdown-option.model';
import { Icon } from 'src/app/model/icon.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list: List;

  isLoading: boolean;
  showDropdown: boolean;

  readonly options: DropdownOption[] = [
    {
      name: 'Vaciar lista',
      icon: Icon.EMPTY,
      callback: () => console.log('1'),
    },
    {
      name: 'Eliminar lista',
      icon: Icon.DELETE,
      callback: () => console.log('2'),      
    },
  ];
  
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
