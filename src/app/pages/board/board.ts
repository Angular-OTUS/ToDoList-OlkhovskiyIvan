import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal, DestroyRef } from '@angular/core';
import { TodoItem } from "../../components/todo-item/todo-item";
import { MessageTypes, StatusTaskTypes } from '../../models/constants';
import { ITaskType } from '../../models/interfaces';
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';
import { Spinner } from "../../components/spinner/spinner";
import { RestService } from '../../services/rest-service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { combineLatest } from 'rxjs';
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

  private toDoListService = inject(ToDoListService);
  private restService = inject(RestService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadTasks();
    this.syncTasks();
  }

  private syncTasks(): void {
    combineLatest([
      this.toDoListService.inProgressTasks$,
      this.toDoListService.completedTasks$,
    ]).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([progress, completed]) => {
        this.progressTask.set(progress);
        this.completedTask.set(completed);
      });
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.restService.getTasks(null).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.toDoListService.setTasks(result);
      this.isLoading.set(false);
    });
  }

  onDropItem(dropEvent: CdkDragDrop<ITaskType[], ITaskType[], ITaskType>): void {

    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {

      const dropItem = dropEvent.previousContainer.data[dropEvent.previousIndex];
      const newStatus = dropItem.status === StatusTaskTypes.completed
        ? StatusTaskTypes.inProgress
        : StatusTaskTypes.completed;

      this.toDoListService.updateItem(dropItem.id, { status: newStatus });
      this.onChangeStatus(dropItem.id, newStatus);

      transferArrayItem(
        dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex,
      );
    }
  }

  onChangeStatus(id: number, newStatus: StatusTaskTypes): void {
    const item = this.toDoListService.getItem(id);
    if (!item) return;
    this.restService.updateTask(id, { ...item, status: newStatus }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (newStatus === StatusTaskTypes.completed) {
        this.toastService.show("Задача успешно выполнена!", MessageTypes.info);
      }
    });
  }

}
