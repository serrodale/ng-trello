import { environment } from '../../environments/environment';

export const ENDPOINTS = {
    register: `${environment.serverUrl}/users`,
    login: `${environment.serverUrl}/users/login`,
    getAllLists: `${environment.serverUrl}/list`,
    createList: `${environment.serverUrl}/list`,
    modifyList: (id: number) => `${environment.serverUrl}/list/${id}`,
    deleteList: (id: number) => `${environment.serverUrl}/list/${id}`,
    getTasksOfList: (listId: number) => `${environment.serverUrl}/list/tasks/${listId}`,
    createTask: `${environment.serverUrl}/tasks`,
    modifyTask: (id: number) => `${environment.serverUrl}/tasks/${id}`,
    deleteTask: (id: number) => `${environment.serverUrl}/tasks/${id}`,
    deleteTasksOfList: (listId: number) => `${environment.serverUrl}/list/tasks/${listId}`,
}
