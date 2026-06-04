import { ChangeDetectionStrategy, Component, computed, inject, OnInit, OnDestroy, signal, input, DestroyRef } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-backlog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, MatButtonModule, NgOptimizedImage, TodoItem, FormsModule, MatInputModule, ItemDescription, Spinner, TodoCreateItem],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
})
export class Backlog implements OnInit {

  protected buttonType = ButtonTypes;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected selectItemFilter: StatusTaskTypes | null = null;
  protected statusTaskTypes = StatusTaskTypes;
  readonly selectedItemId = input.required<string>();
  protected selectedItem = computed(() =>
    this.toDoListService.tasks().find(item => item.id.toString() === this.selectedItemId())
  );
  private destroyRef = inject(DestroyRef); 


  protected toDoListService = inject(ToDoListService);
  private restService = inject(RestService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  ngOnInit(): void {

    this.loadToDoListTask(this.selectItemFilter);
  }

  loadToDoListTask(filterValue: StatusTaskTypes | null) {

    this.selectItemFilter = filterValue;
    this.isLoading.set(true);
    this.restService.getTasks(this.selectItemFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.toDoListService.initList(result);
      this.isLoading.set(false);
    });
  }

  onAddTask(task: ITaskType) {
    this.toDoListService.addItem(task);
  }

  onDelTask(id: number) {
    this.isLoading.set(true);
    this.restService.delTask(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.delItem(id);
      this.isLoading.set(false);
      this.router.navigate(['backlog']);
    });
  }

  onClickTask(id: number) {
    this.router.navigate(['backlog', id.toString()]);
  }


  onChangeName(event: string, id: number) {

    const item: ITaskType | undefined = this.toDoListService.getItem(id);
    if (!item) return;
    item.text = event;

    this.isLoading.set(true);
    this.restService.updateTask(id, item).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.refreshItems();
      this.toastService.show("Наименование задачи успешно обновлено!", MessageTypes.info);
      this.isLoading.set(false);
    });
  }

  onChangeStatus(event: StatusTaskTypes) {

    const id = this.selectedItem()?.id;
    if(!id) return;
    const item: ITaskType | undefined = this.toDoListService.getItem(id);
    if (!item) return;
    item.status = event;

    this.isLoading.set(true);
    this.restService.updateTask(id, item).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.refreshItems();
      if (event === StatusTaskTypes.completed) this.toastService.show("Задача успешно выполнена!", MessageTypes.info)
      this.isLoading.set(false);
    });
  }

}
