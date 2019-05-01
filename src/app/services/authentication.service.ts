import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserForm, UserCredentials } from '../model/user.model';
import { ENDPOINTS } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardDistributionService } from './board-distribution.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly localStorageKeyName: string = 'user';
    private storedUser: UserCredentials;

    constructor(
        private http: HttpClient,
        private boardDistributionService: BoardDistributionService
    ) {
        const localStorageValue: string = localStorage.getItem(this.localStorageKeyName);
        const storedUserParsed: JSON = JSON.parse(localStorageValue);
        const storedUser: UserCredentials = storedUserParsed ? new UserCredentials(storedUserParsed) : null;

        this.storedUser = storedUser;
    }

    getStoredUser(): UserCredentials {
        return this.storedUser;
    }

    register(userForm: UserForm): Observable<any> {
        return this.http.post(ENDPOINTS.register, userForm);
    }

    login(userForm: UserForm): Observable<UserCredentials> {
        return this.http.post<string>(ENDPOINTS.login, userForm, {responseType: 'text' as 'json'})
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

    logout(): void {
        // Eliminamos del localStorage el usuario que había guardado
        localStorage.removeItem(this.localStorageKeyName);

        // Para que si se hace login con otro user no intente renderizar la distribución del anterior
        this.boardDistributionService.empty();
    }

}