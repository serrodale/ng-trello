import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserForm, UserCredentials } from '../model/user.model';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly localStorageKeyName: string = 'user';
    private storedUser: UserCredentials;

    constructor(
        private httpClient: HttpClient,
    ) {
        const localStorageValue: string = localStorage.getItem(this.localStorageKeyName);
        const storedUserParsed: JSON = JSON.parse(localStorageValue);
        const storedUser: UserCredentials = storedUserParsed ? new UserCredentials(storedUserParsed) : null;

        this.storedUser = storedUser;
    }

    register(userForm: UserForm): Observable<any> {
        return this.httpClient.post(ENDPOINTS.register, userForm);
    }

    login(userForm: UserForm): Observable<UserCredentials> {
        return this.httpClient.post<string>(ENDPOINTS.login, userForm, {responseType: 'text' as 'json'})
            .pipe(
                map((jwt: string) => {
                    // Si llegamos aquí es porque el login es válido
                    const user: UserCredentials = { username: userForm.username, jwt };

                    // Guardamos el usuario en el localStorage como un JSON parseado
                    const jsonParsedUser: string = JSON.stringify(user);
                    localStorage.setItem(this.localStorageKeyName, jsonParsedUser);

                    return user;
                })
            );
    }

}