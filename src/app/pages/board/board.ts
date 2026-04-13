import { ChangeDetectionStrategy, Component, computed, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core';
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


@Component({
  selector: 'app-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, TodoItem, Spinner],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit, OnDestroy {

  protected isLoading = signal(true);
  protected subscriptions: Subscription[] = [];

  protected progressTask: WritableSignal<ITaskType[]> = signal([]);  
  protected completedTask: WritableSignal<ITaskType[]> = signal([]);  


  constructor(private restService: RestService,
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
  }

  onChangeStatus(item: ITaskType) {

    const sub = this.restService.updateTask(item.id, item).subscribe(() => {
      if (item.status == StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
    });
    this.subscriptions.push(sub);
  }

}
