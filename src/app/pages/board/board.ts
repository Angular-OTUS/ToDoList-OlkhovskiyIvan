import { ChangeDetectionStrategy, Component, computed, OnInit, OnDestroy, signal, WritableSignal, input } from '@angular/core';
import { TodoItem } from "../../components/todo-item/todo-item";
import { ButtonTypes, ImgPath, MessageTypes, StatusTaskTypes } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ItemDescription } from "../../components/item-description/item-description";
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';
import { NgOptimizedImage } from '@angular/common';
import { Spinner } from "../../components/spinner/spinner";
import { RestService } from '../../services/rest-service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TodoCreateItem } from "../../components/todo-create-item/todo-create-item";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatMenuModule, MatButtonModule, NgOptimizedImage, TodoItem, FormsModule, MatInputModule, ItemDescription, Spinner],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit, OnDestroy {
//   item.text = event;
//   this.isLoading.set(true);
//   const sub = this.restService.updateTask(id, item).subscribe(() => {
//     this.toDoListTask.update((value) => [...value]);    
//     this.toastService.show("Наименование задачи успешно обновлено!", MessageTypes.info);
//     this.isLoading.set(false);
//   });
//   this.subscriptions.push(sub);
// }
// onChangeStatus(event: StatusTaskTypes) {
//   const id = this.selectedItem()?.id; 
//   if(!id) return;
//   let item: ITaskType | undefined = this.toDoListService.getItem(id);
//   if (!item) return;
//   item.status = event;
//   this.isLoading.set(true);
//   const sub = this.restService.updateTask(id, item).subscribe(() => {
//     this.toDoListTask.update((value) => [...value]);    
//     if (event == StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
//     this.isLoading.set(false);
//   });
//   this.subscriptions.push(sub);
// }



  protected buttonType = ButtonTypes;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected statusTaskTypes = StatusTaskTypes;  
  protected subscriptions: Subscription[] = [];

  protected progressTask: WritableSignal<ITaskType[]> = signal([]);  
  protected completedTask: WritableSignal<ITaskType[]> = signal([]);  


  constructor(private toDoListService:ToDoListService, 
              private restService: RestService,
              private toastService: ToastService) {

              }

  ngOnInit(): void {
    this.loadToDoListTask();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadToDoListTask() {

    this.isLoading.set(true);
    const sub = this.restService.getTasks(null).subscribe((result) => {

      this.progressTask.set(result.filter(item => item.status == StatusTaskTypes.inProgress));
      this.completedTask.set(result.filter(item => item.status == StatusTaskTypes.completed));
      // this.toDoListService.initList(result);
      this.isLoading.set(false);
    });
    this.subscriptions.push(sub);
  }

  onDropItem(dropEvent: CdkDragDrop<ITaskType[],ITaskType[],any>) {

    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      
      let dropItem = dropEvent.previousContainer.data[dropEvent.previousIndex];
      dropItem.status = dropItem.status == StatusTaskTypes.completed ? StatusTaskTypes.inProgress : StatusTaskTypes.completed
      this.onChangeStatus(dropItem);

      transferArrayItem(
        dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex,
      );
    }

    // console.log(this.progressTask())
    // console.log(this.completedTask())
  }
test(event: any) {
  // console.log(event);
}
  // onDelTask(id: number) {   
  //   this.isLoading.set(true);
  //   const sub = this.restService.delTask(id).subscribe(() => {
  //     this.toDoListTask.set(this.toDoListService.delItem(id));      
  //     this.isLoading.set(false);
  //     this.router.navigate(['tasks']);
  //   });
  //   this.subscriptions.push(sub);
  // }

  // onChangeName(event: string, id: number) {    

  //   let item: ITaskType | undefined = this.toDoListService.getItem(id);
  //   if (!item) return;
  //   item.text = event;

  //   this.isLoading.set(true);
  //   const sub = this.restService.updateTask(id, item).subscribe(() => {
  //     this.toDoListTask.update((value) => [...value]);    
  //     this.toastService.show("Наименование задачи успешно обновлено!", MessageTypes.info);
  //     this.isLoading.set(false);
  //   });
  //   this.subscriptions.push(sub);
  // }

  onChangeStatus(item: ITaskType) {

    const sub = this.restService.updateTask(item.id, item).subscribe(() => {
      if (item.status == StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
    });
    this.subscriptions.push(sub);
  }

}
