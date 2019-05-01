import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { List } from '../model/list.model';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { BoardDistributionService } from './board-distribution.service';

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(
        private http: HttpClient,
        private boardDistributionService: BoardDistributionService,
    ) {}

    getAllLists(): Observable<List[]> {
        return this.http.get(ENDPOINTS.getAllLists).pipe(
            map((listsDto: any) => listsDto.map((listDto: any) => new List(listDto))),
            map((lists: List[]) => this.boardDistributionService.getSortedLists(lists))
        );
    }

    createList(name: string): Observable<List> {
        return this.http.post(ENDPOINTS.createList, { name }).pipe(
            map((listDto: any) => new List(listDto)),
            tap((list: List) => this.boardDistributionService.addList(list.id))
        );
    }

    modifyList(id: number, name: string): Observable<List> {
        return this.http.put(ENDPOINTS.modifyList(id), { name }).pipe(
            map((listDto: any) => new List(listDto)),
        );
    }

    deleteTasksOfList(listId: number): Observable<any> {
        return this.http.delete(ENDPOINTS.deleteTasksOfList(listId), { responseType: 'text' as 'json' }).pipe(
            tap(_ => this.boardDistributionService.deleteTasksOfList(listId))
        );
    }

    deleteList(id: number): Observable<any> {
        return this.http.delete(ENDPOINTS.deleteList(id)).pipe(
            tap(() => this.boardDistributionService.deleteList(id)),
        );
    }

}