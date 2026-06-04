import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ITaskType } from '../models/interfaces';
import { MessageTypes, StatusTaskTypes } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast-service';
import { configuration } from './conf.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  public getTasks(status: StatusTaskTypes | null): Observable<ITaskType[]> {

    const filter = status ? '?status:eq=' + status : '';

    return this.http.get<ITaskType[]>(configuration.restUrl + "tasks" + filter).pipe(catchError(() => {
      this.toastService.show("Сервис не доступен", MessageTypes.error);
      return EMPTY;
    }));
  }

  public updateTask(id: number, item: ITaskType): Observable<void> {
    return this.http.put<void>(configuration.restUrl + "tasks/" + id.toString(), item).pipe(catchError(() => {
      this.toastService.show("Сервис не доступен", MessageTypes.error);
      return EMPTY;
    }));
  }

  public createTask(newItem: ITaskType): Observable<ITaskType> {
    return this.http.post<ITaskType>(configuration.restUrl + "tasks", newItem).pipe(catchError(() => {
      this.toastService.show("Сервис не доступен", MessageTypes.error);
      return EMPTY;
    }));
  }

  public delTask(id: number): Observable<void> {
    return this.http.delete<void>(configuration.restUrl + "tasks/" + id.toString()).pipe(catchError(() => {
      this.toastService.show("Сервис не доступен", MessageTypes.error);
      return EMPTY;
    }));
  }

}
