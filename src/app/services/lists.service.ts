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
    ) { }

    createList(name: string): Observable<List> {
        return this.http.post(ENDPOINTS.createList, { name }).pipe(
            map((listDto: any) => new List(listDto)),
        );
    }

}