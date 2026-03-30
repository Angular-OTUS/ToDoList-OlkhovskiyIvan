import { Injectable } from '@angular/core';
import { INewTaskType, ITaskType } from '../models/interfaces';
import { StatusTaskTypes } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  
  private toDoListTask: ITaskType[] = [];

  public initList(taskList:ITaskType[]): void {
    this.toDoListTask = taskList;
  }

  public getItem(id: number): ITaskType | undefined {

    return this.toDoListTask.find(item => item.id === id);
  }

  public addItem(task: ITaskType): ITaskType[] {

    this.toDoListTask.push(task);
    return this.toDoListTask;
  }

  public delItem(id: number): ITaskType[] {
    this.toDoListTask = this.toDoListTask.filter(item => item.id != id);
    return this.toDoListTask;
  }

  public getNewID():number {
    return this.toDoListTask.length === 0 ? 0 : Math.max(...this.toDoListTask.map(obj => obj.id));
  }
}
