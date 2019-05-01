import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { BoardDistributionService } from './board-distribution.service';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private http: HttpClient,
        private boardDistributionService: BoardDistributionService,
    ) {}

    getTasksOfList(listId: number): Observable<Task[]> {
        return this.http.get(ENDPOINTS.getTasksOfList(listId)).pipe(
            map((tasksDto: any[]) => tasksDto ? tasksDto.map((taskDto: any) => new Task(taskDto)) : []),
            map((tasks: Task[]) => this.boardDistributionService.getSortedTasks(tasks))
        );
    }

    createTask(task: string, listId: number): Observable<Task> {
        return this.http.post(ENDPOINTS.createTask, { task, idlist: listId }).pipe(
            map((taskDto: any) => new Task(taskDto)),
            tap((task: Task) => this.boardDistributionService.addTask(task))
        );
    }

    modifyTask(id: number, task: string): Observable<number> {
        return this.http.put(ENDPOINTS.modifyTask(id), { task }).pipe(
            map((numberOfTasksModified: number) => numberOfTasksModified)
        );
    }

    modifyListIdOfTask(taskId: number, listId: number): Observable<number> {
        return this.http.put<number>(ENDPOINTS.modifyTask(taskId), { idlist: listId });
    }

    deleteTask(id: number, listId: number): Observable<void> {
        return this.http.delete<void>(ENDPOINTS.deleteTask(id)).pipe(
            tap(_ => this.boardDistributionService.deleteTask(id, listId))
        );
    }
    
}