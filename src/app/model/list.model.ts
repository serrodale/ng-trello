import { Task } from './task.model';

export class List {
    public id: number;
    public name: string;
    public userId: number;
    public updatedAt: Date;
    public createdAt: Date;
    public tasks: Task[];

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.userId = dto.id_user;
        this.updatedAt = new Date(Date.parse(dto.updated_at));
        this.createdAt = new Date(Date.parse(dto.created_at));
        this.tasks = [];
    }
}
