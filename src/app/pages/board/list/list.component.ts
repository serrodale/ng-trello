import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from 'src/app/model/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';
import { DropdownOption } from 'src/app/model/dropdown-option.model';
import { Icon } from 'src/app/model/icon.model';
import { ModalsService } from 'src/app/services/modals.service';
import { ConfirmationModal } from 'src/app/model/modal.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list: List;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  isLoading: boolean;
  showDropdown: boolean;

  readonly options: DropdownOption[] = [
    {
      name: 'Vaciar lista',
      icon: Icon.EMPTY,
      callback: () => this.modalsService.addConfirmationModal(
        new ConfirmationModal(
          'Se borrarán todas las tareas de la lista. ¿Desea continuar?',
          () => this.deleteTasksOfList(),
          'Continuar',
        )
      ),
    },
    {
      name: 'Eliminar lista',
      icon: Icon.DELETE,
      callback: () => this.modalsService.addConfirmationModal(
        new ConfirmationModal(
          'Se borrará la lista y sus tareas. ¿Desea continuar?',
          () => this.deleteList(),
          'Continuar',
        )
      ),
    },
  ];
  
  constructor(
    private listsService: ListsService,
    private tasksService: TasksService,
    private alertsService: AlertsService,
    private modalsService: ModalsService,
  ) {
    this.modifyList = this.modifyList.bind(this);
  }
  
  ngOnInit() {
    this.getTasks();
  }

  private getTasks(): void {
    this.tasksService.getTasksOfList(this.list.id).subscribe((tasks: Task[]) => {
      this.list.tasks = tasks || [];
    });
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

  deleteList(): void {
    this.listsService.deleteList(this.list.id).subscribe(_ => {
      this.delete.emit(this.list.id);
      this.alertsService.addSuccessAlert(new SuccessAlert('Lista eliminada'));
    });
  }

  deleteTasksOfList(): void {
    console.log('deleteTasksOfList');
  }

  onKeydown(keyCode: number, input: HTMLInputElement): void {
    const value: string = input.value;
    
    // Solo nos interesa la tecla enter y que el valor del input no sea una cadena vacía
    if (keyCode !== 13 || !value.trim()) {
      return;
    }
    
    this.createTask(value);

    // Reseteamos el valor para que se borre el contenido que había antes
    input.value = '';
  }

  private createTask(name: string): void {
    this.tasksService.createTask(name, this.list.id).subscribe((task: Task) => {
      this.list.tasks.push(task);
      this.alertsService.addSuccessAlert(new SuccessAlert('Tarea creada'));
    });
  }

}
