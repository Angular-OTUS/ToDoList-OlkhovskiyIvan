import { ChangeDetectionStrategy, Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { ButtonType, ImgPath, MessageType } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../button-component/button-component";
import { ItemDescription } from "../item-description/item-description";
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-to-do-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoItem, FormsModule, MatInputModule, ButtonComponent, ItemDescription],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {

  protected buttonType = ButtonType;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected selectedItemId: WritableSignal<number | undefined> = signal(undefined);
  protected selectedItem = computed(() => 
    this.toDoListTask().find(item => item.id === this.selectedItemId())
  );
  protected newTaskName: WritableSignal<string> = signal("");
  protected newTaskDescription: WritableSignal<string> = signal("");
  protected toDoListTask: WritableSignal<ITaskType[]> = signal([]);


  constructor(private toDoListService:ToDoListService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.toDoListTask.set(this.toDoListService.getToDoList());
    setTimeout(() => {this.isLoading.set(false)}, 500);
  }

  onDelTask(id: number) {      
      this.toDoListTask.set(this.toDoListService.delItem(id));
      if (this.selectedItemId() === id) this.selectedItemId.set(undefined);
  }

  onClickTask(id: number) {
    this.selectedItemId.set(id);
  }

  onClickAdd() {    

    this.toDoListTask.set(this.toDoListService.addItem({
      text: this.newTaskName(),
      description: this.newTaskDescription()
    }));
    
    this.newTaskDescription.set("");
    this.newTaskName.set("");

    this.toastService.show("Новая задача успешно добавлена в список дел!", MessageType.info)
  }

  onUpdateTask(event: string, id: number) {    
    this.toDoListTask.set([...this.toDoListService.updateItem(id, event)]);    
  }

}
