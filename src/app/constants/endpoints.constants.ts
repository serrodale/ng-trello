import { environment } from '../../environments/environment';

export const ENDPOINTS = {
    register: `${environment.serverUrl}/users`,
    login: `${environment.serverUrl}/users/login`,
    createList: `${environment.serverUrl}/list`,
    getAllLists: `${environment.serverUrl}/list`,
}
