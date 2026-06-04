import { Injectable } from '@angular/core';
import { ITaskType } from '../models/interfaces';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

  private toDoListTask = signal<ITaskType[]>([]);
  readonly tasks = this.toDoListTask.asReadonly();

  public initList(taskList: ITaskType[]): void {
    this.toDoListTask.set(taskList);
  }

  public getItem(id: number): ITaskType | undefined {
    return this.toDoListTask().find(item => item.id === id);
  }

  public addItem(task: ITaskType): void {
    this.toDoListTask.update(list => [...list, task]);
  }

  public delItem(id: number): void {
    this.toDoListTask.update(list => list.filter(item => item.id !== id));
  }

  public getNewID(): number {
    const list = this.toDoListTask();
    return list.length === 0 ? 0 : Math.max(...list.map(obj => obj.id));
  }

  public refreshItems(): void {
    this.toDoListTask.update(list => [...list]);
  }
}
