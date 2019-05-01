import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private http: HttpClient,
    ) {}

    getTasksOfList(listId: number): Observable<Task[]> {
        return this.http.get(ENDPOINTS.getTasksOfList(listId)).pipe(
            map((tasksDto: any[]) => tasksDto ? tasksDto.map((taskDto: any) => new Task(taskDto)) : []),
        );
    }

    createTask(task: string, listId: number): Observable<Task> {
        return this.http.post(ENDPOINTS.createTask, { task, idlist: listId }).pipe(
            map((taskDto: any) => new Task(taskDto)),
        );
    }

    modifyTask(id: number, task: string): Observable<number> {
        return this.http.put(ENDPOINTS.modifyTask(id), { task }).pipe(
            map((numberOfTasksModified: number) => numberOfTasksModified)
        );
    }

    deleteTask(id: number, listId: number): Observable<void> {
        return this.http.delete<void>(ENDPOINTS.deleteTask(id));
    }
    
}