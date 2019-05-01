import { environment } from '../../environments/environment';

export const ENDPOINTS = {
    register: `${environment.serverUrl}/users`,
    login: `${environment.serverUrl}/users/login`,
    getAllLists: `${environment.serverUrl}/list`,
    createList: `${environment.serverUrl}/list`,
    modifyList: (id: number) => `${environment.serverUrl}/list/${id}`,
}
