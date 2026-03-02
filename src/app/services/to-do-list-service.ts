import { Injectable } from '@angular/core';
import { INewTaskType, ITaskType } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  
  private toDoListTask: ITaskType[] = [
    {id: 1, text: "Задача 1", description: "Описание задачи 1"},
    {id: 2, text: "Задача 2", description: "Описание задачи 2"},
    {id: 3, text: "Задача 3", description: "Описание задачи 3"},
  ];

  public getToDoList(): ITaskType[] {
    return this.toDoListTask;
  }

  
  public updateItem(id: number, newName: string): ITaskType[] {

    let task: ITaskType | undefined = this.toDoListTask.find(item => item.id === id);
    if (task) task.text = newName;

    return this.toDoListTask;
  }

  public addItem(task: INewTaskType): ITaskType[] {

    const maxIdValue: number = this.toDoListTask.length === 0 ? 0 : Math.max(...this.toDoListTask.map(obj => obj.id));    

    this.toDoListTask.push({
      id: maxIdValue + 1,
      text: task.text,
      description: task.description,
    });
    
    return this.toDoListTask;
  }

  public delItem(id: number): ITaskType[] {
    this.toDoListTask = this.toDoListTask.filter(item => item.id != id);
    return this.toDoListTask;
  }
}
