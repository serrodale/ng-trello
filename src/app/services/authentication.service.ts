import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserForm } from '../model/user.model';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient,
    ) {}

    register(userForm: UserForm): Observable<any> {
        return this.httpClient.post(ENDPOINTS.register, userForm);
    }

}