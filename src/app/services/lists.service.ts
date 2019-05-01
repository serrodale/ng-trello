import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { List } from '../model/list.model';
import { ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(
        private http: HttpClient,
    ) {}

    getAllLists(): Observable<List[]> {
        return this.http.get(ENDPOINTS.getAllLists).pipe(
            map((listsDto: any) => listsDto.map((listDto: any) => new List(listDto))),
        );
    }

    createList(name: string): Observable<List> {
        return this.http.post(ENDPOINTS.createList, { name }).pipe(
            map((listDto: any) => new List(listDto)),
        );
    }

    modifyList(id: number, name: string): Observable<List> {
        return this.http.put(ENDPOINTS.modifyList(id), { name }).pipe(
            map((listDto: any) => new List(listDto)),
        );
    }

}