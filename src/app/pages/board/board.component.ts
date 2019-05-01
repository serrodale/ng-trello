import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';
import { List } from 'src/app/model/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { Task } from 'src/app/model/task.model';
import { DragulaService } from 'ng2-dragula';
import { BoardDistributionService } from 'src/app/services/board-distribution.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    lists: List[] = [];

    constructor(
        private router: Router,
        private tasksService: TasksService,
        private listsService: ListsService,
        private alertsService: AlertsService,
        private dragulaService: DragulaService,
        private authenticationService: AuthenticationService,
        private boardDistributionService: BoardDistributionService,
    ) {}

    ngOnInit() {
        this.setDragulaConfig();
        this.getAllLists();
    }

    onKeydown(keyCode: number, input: HTMLInputElement): void {
        const value: string = input.value;

        // Solo nos interesa la tecla enter y que el valor del input no sea una cadena vacía
        if (keyCode !== 13 || !value.trim()) {
            return;
        }

        this.createList(value);

        // Reseteamos el valor para que se borre el contenido que había antes
        input.value = '';
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        this.alertsService.addSuccessAlert(new SuccessAlert('Sesión cerrada'));
    }

    onDeleteList(id: number): void {
        this.lists = this.lists.filter((list: List) => list.id !== id);
    }

    onDeleteTask(task: Task): void {
        const taskId: number = task.id;
        const listWhereTaskBelongs: List = this.lists.find((list: List) => list.id === task.listId);
        listWhereTaskBelongs.tasks = listWhereTaskBelongs.tasks.filter((task: Task) => task.id !== taskId);
    }

    private setDragulaConfig(): void {
        // Porque si se crea existiendo uno, da error
        this.dragulaService.destroy('lists');
        this.dragulaService.destroy('tasks');

        this.dragulaService.createGroup('lists', {
          direction: 'horizontal',
          moves: (_, __, handle: Element) => {
            return !handle.className.includes('task') && !handle.className.includes('task-content');
          }
        });
    
        this.dragulaService.createGroup('tasks', {
          moves: (_, __, handle: Element) => {
            return !handle.className.includes('task-content');
          }
        });

        this.dragulaService.dropModel().subscribe(async (dragulaEvent: any) => {
            // Para evitar tener varios if/else anidados
            let updateBoardDistribution: boolean = true;
      
            if (dragulaEvent.name === 'tasks') {
              // Dragula no se encarga de actualizar el atributo listId de la tarea movida; si la
              // movemos de lista, únicamente quita la tarea de la lista en la que se encontraba y
              // la pone en el array de tareas que se corresponde con el de la nueva. Así que
              // tenemos que cambiar este atributo manualmente. Para saber su nuevo valor, 
              // buscamos la nueva lista en el array de listas con findListWhereIsTask, que hace
              // falta que sea asíncrono porque cuando se lanza este evento, todavía no se ha modificado
              // el atributo lists porque todavía no se ha ejecutado un ciclo del change detection
              const modifiedTask: Task = dragulaEvent.item;
              const modifiedTaskId: number = modifiedTask.id;
              const targetList: List = await this.findListWhereIsTask(modifiedTaskId);
              
              // Comprobamos si se ha cambiado de lista
              if (modifiedTask.listId !== targetList.id) {
                // Porque ya lo actualizaremos al completar la llamada de modifyListIdOfTask 
                updateBoardDistribution = false;
      
                // Actualizamos la BBDD
                this.tasksService.modifyListIdOfTask(modifiedTask.id, targetList.id).subscribe(_ => {
                  this.boardDistributionService.update(this.lists);
                });
              }
            }
      
            if (updateBoardDistribution) {
                // Hace falta cuando se mueven las listas para que se actualice this.lists
                setTimeout(() => this.boardDistributionService.update(this.lists));
            }
          });
    }

    private findListWhereIsTask(taskId: number): Promise<List> {
        return new Promise((resolve: Function, reject: Function) => {
          setTimeout(() => {
            resolve(this.lists.find((list: List) => !!list.tasks.find((task: Task) => task.id === taskId)));
          });
        });
    }

    private getAllLists(): void {
        this.listsService.getAllLists().subscribe((lists: List[]) => {
            this.lists = lists;
        });
    }

    private createList(name: string): void {
        this.listsService.createList(name).subscribe((list: List) => {
            this.lists.push(list);
            this.alertsService.addSuccessAlert(new SuccessAlert('Lista creada'));
        });
    }

}
