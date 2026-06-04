import { ChangeDetectionStrategy, Component, computed, inject, OnInit, OnDestroy, signal, WritableSignal, DestroyRef } from '@angular/core';
import { TodoItem } from "../../components/todo-item/todo-item";
import { MessageTypes, StatusTaskTypes } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { ToastService } from '../../services/toast-service';
import { Spinner } from "../../components/spinner/spinner";
import { RestService } from '../../services/rest-service';
import { Subscription } from 'rxjs';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, TodoItem, Spinner],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {

  protected isLoading = signal(true);  

  protected progressTask: WritableSignal<ITaskType[]> = signal([]);  
  protected completedTask: WritableSignal<ITaskType[]> = signal([]);  


  private restService = inject(RestService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef); 

  ngOnInit(): void {
    this.loadToDoListTask();
  }

  loadToDoListTask() {

    this.isLoading.set(true);
    this.restService.getTasks(null).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {

      this.progressTask.set(result.filter(item => item.status === StatusTaskTypes.inProgress));
      this.completedTask.set(result.filter(item => item.status === StatusTaskTypes.completed));
      this.isLoading.set(false);
    });    
  }

  onDropItem(dropEvent: CdkDragDrop<ITaskType[],ITaskType[],any>) {

    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      
      const dropItem = dropEvent.previousContainer.data[dropEvent.previousIndex];
      dropItem.status = dropItem.status === StatusTaskTypes.completed ? StatusTaskTypes.inProgress : StatusTaskTypes.completed
      this.onChangeStatus(dropItem);

      transferArrayItem(
        dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex,
      );
    }
  }

  onChangeStatus(item: ITaskType) {

    this.restService.updateTask(item.id, item).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (item.status === StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
    });    
  }

}
