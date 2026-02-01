import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { buttonType, ConstImgValue } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../button-component/button-component";

@Component({
  selector: 'app-to-do-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoItem, FormsModule, MatInputModule, ButtonComponent],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {

  protected bType = buttonType;
  public isLoading = signal(true);
  protected img = ConstImgValue;
  protected newTaskName: WritableSignal<string> = signal("");
  protected toDoListTask: WritableSignal<ITaskType[]> = signal([
    {id: 1, text: "Задача 1"},
    {id: 2, text: "Задача 2"},
    {id: 3, text: "Задача 3"}
  ]);

  ngOnInit(): void {
    setInterval(() => {this.isLoading.set(false)}, 500);
  }

  onDelTask(id: number) {
      this.toDoListTask.set(this.toDoListTask().filter(item => item.id != id));
  }

  onClickAdd() {    
    const maxIdValue: number = this.toDoListTask.length == 0 ? 0 : Math.max(...this.toDoListTask().map(obj => obj.id));    

    this.toDoListTask.set([...this.toDoListTask(), {
      id: maxIdValue + 1,
      text: this.newTaskName()
    }]);
    
    this.newTaskName.set("");
  }
}
