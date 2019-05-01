import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { SuccessAlert } from 'src/app/model/alert.model';
import { List } from 'src/app/model/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { Task } from 'src/app/model/task.model';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    lists: List[] = [];

    constructor(
        private router: Router,
        private listsService: ListsService,
        private alertsService: AlertsService,
        private dragulaService: DragulaService,
        private authenticationService: AuthenticationService,
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
