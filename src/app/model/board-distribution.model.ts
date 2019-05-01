export class ListOrder {
    listId: number;
    tasksOrder: number[];

    constructor(dto: any) {
        this.listId = dto.listId;
        this.tasksOrder = dto.tasksOrder;
    }
}
