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

    createTask(task: string, listId: number): Observable<Task> {
        return this.http.post(ENDPOINTS.createTask, { task, idlist: listId }).pipe(
            map((taskDto: any) => new Task(taskDto)),
        );
    }
    
}