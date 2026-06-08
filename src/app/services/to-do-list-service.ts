import { Injectable } from '@angular/core';
import { ITaskType } from '../models/interfaces';
import { StatusTaskTypes } from '../models/constants';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

  private tasksSubject = new BehaviorSubject<ITaskType[]>([]);
  private filterSubject = new BehaviorSubject<StatusTaskTypes | null>(null);

  tasks$: Observable<ITaskType[]> = this.tasksSubject.asObservable();
  filter$: Observable<StatusTaskTypes | null> = this.filterSubject.asObservable();

  filteredTasks$: Observable<ITaskType[]> = combineLatest([
    this.tasks$,
    this.filter$,
  ]).pipe(
    map(([tasks, filter]) =>
      filter === null ? tasks : tasks.filter(t => t.status === filter),
    ),
  );

  inProgressTasks$: Observable<ITaskType[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(t => t.status === StatusTaskTypes.inProgress)),
  );

  completedTasks$: Observable<ITaskType[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(t => t.status === StatusTaskTypes.completed)),
  );

  public setTasks(taskList: ITaskType[]): void {
    this.tasksSubject.next(taskList);
  }

  public getItem(id: number): ITaskType | undefined {
    const item = this.tasksSubject.getValue().find(i => i.id === id);
    return item ? { ...item } : undefined;
  }

  public updateItem(id: number, update: Partial<ITaskType>): void {
    const current = this.tasksSubject.getValue();
    this.tasksSubject.next(current.map(item =>
      item.id === id ? { ...item, ...update } : item,
    ));
  }

  public addItem(task: ITaskType): void {
    const current = this.tasksSubject.getValue();
    this.tasksSubject.next([...current, task]);
  }

  public delItem(id: number): void {
    const current = this.tasksSubject.getValue();
    this.tasksSubject.next(current.filter(item => item.id !== id));
  }

  public getNewID(): number {
    const list = this.tasksSubject.getValue();
    return list.length === 0 ? 0 : Math.max(...list.map(obj => obj.id));
  }

  public setFilter(filter: StatusTaskTypes | null): void {
    this.filterSubject.next(filter);
  }

  public getFilter(): StatusTaskTypes | null {
    return this.filterSubject.getValue();
  }
}
