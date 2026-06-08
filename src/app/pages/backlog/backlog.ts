import { ChangeDetectionStrategy, Component, inject, OnInit, signal, input, DestroyRef } from '@angular/core';
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
import { Router } from '@angular/router';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-backlog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, MatButtonModule, NgOptimizedImage, TodoItem, FormsModule, MatInputModule, ItemDescription, Spinner, TodoCreateItem],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
})
export class Backlog implements OnInit {

  private destroyRef = inject(DestroyRef);
  protected toDoListService = inject(ToDoListService);
  private restService = inject(RestService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  protected buttonType = ButtonTypes;
  protected isLoading = signal(true);
  protected img = ImgPath;
  protected statusTaskTypes = StatusTaskTypes;
  readonly selectedItemId = input.required<string>();

  protected tasks = toSignal(this.toDoListService.filteredTasks$, { initialValue: [] as ITaskType[] });
  private selectedItemId$ = toObservable(this.selectedItemId);
  protected selectedItem = toSignal(
    combineLatest([this.toDoListService.tasks$, this.selectedItemId$]).pipe(
      map(([tasks, id]) => tasks.find(item => item.id.toString() === id)),
    ),
    { initialValue: undefined },
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.restService.getTasks(null).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.toDoListService.setTasks(result);
      this.isLoading.set(false);
    });
  }

  onFilterChange(filter: StatusTaskTypes | null): void {
    this.toDoListService.setFilter(filter);
  }

  onAddTask(task: ITaskType): void {
    this.toDoListService.addItem(task);
  }

  onDelTask(id: number): void {
    this.isLoading.set(true);
    this.restService.delTask(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.delItem(id);
      this.isLoading.set(false);
      this.router.navigate(['backlog']);
    });
  }

  onClickTask(id: number): void {
    this.router.navigate(['backlog', id.toString()]);
  }

  onChangeName(newName: string, id: number): void {
    this.isLoading.set(true);
    const item = this.toDoListService.getItem(id);
    if (!item) return;
    this.restService.updateTask(id, { ...item, text: newName }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.updateItem(id, { text: newName });
      this.toastService.show("Наименование задачи успешно обновлено!", MessageTypes.info);
      this.isLoading.set(false);
    });
  }

  onChangeStatus(event: StatusTaskTypes): void {
    const id = this.selectedItem()?.id;
    if (!id) return;
    this.isLoading.set(true);
    const item = this.toDoListService.getItem(id);
    if (!item) return;
    this.restService.updateTask(id, { ...item, status: event }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toDoListService.updateItem(id, { status: event });
      if (event === StatusTaskTypes.completed) {
        this.toastService.show("Задача успешно выполнена!", MessageTypes.info);
      }
      this.isLoading.set(false);
    });
  }

}
