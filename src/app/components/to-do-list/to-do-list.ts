import { ChangeDetectionStrategy, Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { ButtonTypes, ImgPath, MessageTypes, StatusTaskTypes } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ItemDescription } from "../item-description/item-description";
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';
import { NgOptimizedImage } from '@angular/common';
import { Spinner } from "../spinner/spinner";
import { RestService } from '../../services/rest-service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TodoCreateItem } from "../todo-create-item/todo-create-item";

@Component({
  selector: 'app-to-do-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, MatButtonModule, NgOptimizedImage, TodoItem, FormsModule, MatInputModule, ItemDescription, Spinner, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {

  protected buttonType = ButtonTypes;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected selectItemFilter: StatusTaskTypes | null = null;
  protected statusTaskTypes = StatusTaskTypes;
  protected selectedItemId: WritableSignal<number | undefined> = signal(undefined);
  protected selectedItem = computed(() => 
    this.toDoListTask().find(item => item.id === this.selectedItemId())
  );

  protected toDoListTask: WritableSignal<ITaskType[]> = signal([]);


  constructor(private toDoListService:ToDoListService, 
              private restService: RestService,
              private toastService: ToastService) {

              }

  ngOnInit(): void {

    this.loadToDoListTask(this.selectItemFilter);
    
  }

  loadToDoListTask(filterValue: StatusTaskTypes | null) {

    this.selectItemFilter = filterValue;
    this.selectedItemId.set(undefined);
    this.isLoading.set(true);
    this.restService.getTasks(this.selectItemFilter).subscribe((result) => {
      this.toDoListTask.set(result);
      this.toDoListService.initList(result);
      this.isLoading.set(false);
    });
  }

  onAddTask(task: ITaskType) {
    this.toDoListTask.set(this.toDoListService.addItem(task));
  }

  onDelTask(id: number) {   
    this.isLoading.set(true);
    this.restService.delTask(id).subscribe(() => {
      this.toDoListTask.set(this.toDoListService.delItem(id));
      if (this.selectedItemId() === id) this.selectedItemId.set(undefined);
      this.isLoading.set(false);
    });

  }

  onClickTask(id: number) {
    this.selectedItemId.set(id);
  }


  onChangeName(event: string, id: number) {    

    let item: ITaskType | undefined = this.toDoListService.getItem(id);
    if (!item) return;
    item.text = event;

    this.isLoading.set(true);
    this.restService.updateTask(id, item).subscribe(() => {
      this.toDoListTask.update((value) => [...value]);    
      this.toastService.show("Наименование задачи успешно обновлено!", MessageTypes.info);
      this.isLoading.set(false);
    });

  }

  onChangeStatus(event: StatusTaskTypes) {

    const id = this.selectedItem()?.id; 
    if(!id) return;
    let item: ITaskType | undefined = this.toDoListService.getItem(id);
    if (!item) return;
    item.status = event;

    this.isLoading.set(true);
    this.restService.updateTask(id, item).subscribe(() => {
      this.toDoListTask.update((value) => [...value]);    
      if (event == StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
      this.isLoading.set(false);
    });
    
  }

}
