export class Task {
    public id: number;
    public task: string;
    public listId: number;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(dto: any) {
        this.id = dto.id;
        this.task = dto.task;
        this.listId = dto.idlist;
        this.updatedAt = new Date(Date.parse(dto.updated_at));
        this.createdAt = new Date(Date.parse(dto.created_at));
    }
}
