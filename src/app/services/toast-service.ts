import { Injectable } from '@angular/core';
import { MessageTypes } from '../models/constants';
import { IToastType } from '../models/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<IToastType[]>([]);
  private index = 0;

  toasts$: Observable<IToastType[]> = this.toastSubject.asObservable();

  show(message: string, type?: MessageTypes, duration?: number): void {

    const newMess: IToastType = {
      index: this.index++,
      message,
      type: type ?? MessageTypes.info,
    };

    const current = this.toastSubject.getValue();
    this.toastSubject.next([...current, newMess]);

    setTimeout(() => this.remove(newMess.index), duration ?? 5000);
  }

  remove(index: number): void {
    const current = this.toastSubject.getValue();
    this.toastSubject.next(current.filter(item => item.index !== index));
  }
}
