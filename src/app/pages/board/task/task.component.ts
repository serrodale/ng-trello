import { Component, Input } from '@angular/core';
import { Task } from '../../../model/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task;

  isLoading: boolean;

  constructor(
    private tasksService: TasksService,
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

}
