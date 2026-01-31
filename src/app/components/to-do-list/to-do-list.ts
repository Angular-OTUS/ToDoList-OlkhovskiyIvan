import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { ConstImgValue } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-to-do-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoItem, FormsModule, MatInputModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  protected img = ConstImgValue;
  protected newTaskName: WritableSignal<string> = signal("");
  protected toDoListTask: WritableSignal<ITaskType[]> = signal([
    {id: 1, text: "Задача 1"},
    {id: 2, text: "Задача 2"},
    {id: 3, text: "Задача 3"}
  ]);

  onDelTask(id: number) {
      this.toDoListTask.set(this.toDoListTask().filter(item => item.id != id));
  }

  onClickAdd() {

    const maxIdValue: number = Math.max(...this.toDoListTask().map(obj => obj.id));

    this.toDoListTask.set([...this.toDoListTask(), {
      id: maxIdValue + 1,
      text: this.newTaskName()
    }]);
    
    this.newTaskName.set("");
  }
}
