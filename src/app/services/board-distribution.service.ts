import { Injectable } from '@angular/core';
import { ListOrder } from '../model/board-distribution.model';
import { Task } from '../model/task.model';
import { List } from '../model/list.model';

@Injectable({
  providedIn: 'root'
})
export class BoardDistributionService {

  private boardDistribution: ListOrder[];
  
  private readonly localStorageKeyName: string = 'boardDistribution';

  constructor() {
    const localStorageValue: string = localStorage.getItem(this.localStorageKeyName);
    this.boardDistribution = JSON.parse(localStorageValue);
  }

  getBoardDistribution(): ListOrder[] {
    return this.boardDistribution;
  }

  /**
   * Devuelve las listas ordenadas de acuerdo al orden guardado en el localStorage. Si no
   * hay un orden guardado, crea y guarda un nuevo orden a partir de las recibidas
   * @param lists: listas tal y como llegan del back
   */
  getSortedLists(lists: List[]): List[] {
    if (!this.boardDistribution) {
      this.create(lists);
      this.save();

      return lists;
    }

    return this.boardDistribution
      .map((listOrder: ListOrder) => listOrder.listId)
      .map((listId: number) => lists.find((list: List) => list.id === listId));
  }

  /**
   * Devuelve las tareas ordenadas de acuerdo al orden guardado en el localStorage. Si no
   * hay un orden guardado, crea y guarda un nuevo orden a partir de las recibidas
   * @param tasks: listas tal y como llegan del back
   */
  getSortedTasks(tasks: Task[]): Task[] {
    if (!tasks.length) {
      return [];
    }

    const listId: number = tasks[0].listId;
    const listOrder: ListOrder = this.findListOrderById(listId);
    const tasksOrder: number[] = listOrder.tasksOrder;

    // Para la primera vez que se crea la distribución
    if (tasks.length > 0 && tasksOrder.length === 0) {
      tasks.forEach((task: Task) => this.addTask(task));

      return tasks;
    }

    return tasksOrder.map((taskId: number) => tasks.find((task: Task) => task.id === taskId));
  }

  update(lists: List[]): void {
      this.create(lists);

      this.save();
  }

  addList(listId: number): void {
    this.boardDistribution.push({ listId, tasksOrder: [] });

    this.save();
  }

  deleteList(listId: number): void {
    this.boardDistribution = this.boardDistribution.filter((listOrder: ListOrder) => {
      return listOrder.listId !== listId;
    });

    this.save();
  }

  addTask(task: Task): void {
    const listOrder: ListOrder = this.findListOrderById(task.listId);
    listOrder.tasksOrder.push(task.id);

    this.save();
  }

  deleteTask(id: number, listId: number): void {
    let listOrder: ListOrder = this.findListOrderById(listId);
    listOrder.tasksOrder = listOrder.tasksOrder.filter((taskId: number) => taskId !== id);

    this.save();
  }

  deleteTasksOfList(listId: number): void {
    const listOrder: ListOrder = this.findListOrderById(listId);
    listOrder.tasksOrder = [];

    this.save();
  }

  empty(): void {
    localStorage.removeItem(this.localStorageKeyName);
  }

  private create(lists: List[]): void {
    this.boardDistribution = lists.map((list: List) => {
      return { listId: list.id, tasksOrder: list.tasks.map((task: Task) => task.id)};
    });
  }

  private findListOrderById(id: number): ListOrder {
    return this.boardDistribution.find((listOrder: ListOrder) => listOrder.listId === id);
  }

  private save(): void {
    localStorage.setItem(this.localStorageKeyName, JSON.stringify(this.boardDistribution));
  }
  
}
