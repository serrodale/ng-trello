import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../model/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';
import { ModalsService } from 'src/app/services/modals.service';
import { ConfirmationModal } from 'src/app/model/modal.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task;
  @Output() delete: EventEmitter<Task> = new EventEmitter();

  isLoading: boolean;

  constructor(
    private tasksService: TasksService,
    private modalsService: ModalsService,
    private alertsService: AlertsService,
  ) {
    this.modifyTask = this.modifyTask.bind(this);
  }
  
  modifyTask(name: string): void {
    this.isLoading = true;

    this.tasksService.modifyTask(this.task.id, name).subscribe(_ => {
      // Para evitar parpadeos por si llega la respuesta muy rápido del servidor
      setTimeout(() => {
        this.isLoading = false;
        this.task.task = name;
        this.alertsService.addSuccessAlert(new SuccessAlert('Tarea modificada'));
      }, 500);
    });
  }

  showModalOfDeleteTaskConfirmation(): void {
    this.modalsService.addConfirmationModal(
      new ConfirmationModal(
        'Se borrará la tarea indicada. ¿Desea continuar?',
        () => this.deleteTask(),
        'Continuar',
      )
    );
  }

  deleteTask(): void {
    this.isLoading = true;

    this.tasksService.deleteTask(this.task.id, this.task.listId).subscribe(_ => {
      // Para evitar parpadeos por si llega la respuesta muy rápido del servidor
      setTimeout(() => {
        this.isLoading = false;
        this.alertsService.addSuccessAlert(new SuccessAlert('Tarea eliminada'));
        this.delete.emit(this.task);
      }, 500);
    });
  }

}
