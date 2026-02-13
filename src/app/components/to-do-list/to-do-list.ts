import { ChangeDetectionStrategy, Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { buttonType, ImgPath } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../button-component/button-component";
import { ItemDescription } from "../item-description/item-description";

@Component({
  selector: 'app-to-do-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoItem, FormsModule, MatInputModule, ButtonComponent, ItemDescription],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {


  protected buttonType = buttonType;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected selectedItemId: WritableSignal<number | undefined> = signal(undefined);
  protected selectedItem = computed(() => 
    this.toDoListTask().find(item => item.id === this.selectedItemId())
  );
  protected newTaskName: WritableSignal<string> = signal("");
  protected newTaskDescription: WritableSignal<string> = signal("");
  protected toDoListTask: WritableSignal<ITaskType[]> = signal([
    {id: 1, text: "Задача 1", description: "Описание задачи 1"},
    {id: 2, text: "Задача 2", description: "Описание задачи 2"},
    {id: 3, text: "Задача 3", description: "Описание задачи 3"},
  ]);

  ngOnInit(): void {
    setTimeout(() => {this.isLoading.set(false)}, 500);
  }

  onDelTask(id: number) {      
      this.toDoListTask.update(value => value.filter(item => item.id !== id));
      if (this.selectedItemId() === id) this.selectedItemId.set(undefined);
  }

  onClickTask(id: number) {
    this.selectedItemId.set(id);
  }

  onClickAdd() {    
    const maxIdValue: number = this.toDoListTask().length === 0 ? 0 : Math.max(...this.toDoListTask().map(obj => obj.id));    

    this.toDoListTask.update(value => [...value, {
      id: maxIdValue + 1,
      text: this.newTaskName(),
      description: this.newTaskDescription(),
    }]);
    
    this.newTaskDescription.set("");
    this.newTaskName.set("");
  }

  getItemById(id: number):ITaskType | undefined{
    return this.toDoListTask().find(item => item.id === id);
  }
}
