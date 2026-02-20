import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MessageType } from '../models/constants';
import { IToastType } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastText: WritableSignal<IToastType[]> = signal([]); 
  private index: number = 0;

  show(message: string, type?: MessageType, duration?: number) {
    
    const newMess:IToastType = { 
      index: this.index++, 
      message: message, 
      type: type ? type : MessageType.info 
    }

    this.toastText.update((toastText) => [...toastText, newMess]);
    
    setTimeout(() => this.remove(newMess.index), duration ? duration : 5000);
  }

  remove(index: number) {
    this.toastText.update((toastText) => toastText.filter(item => item.index !== index));
  }

  getToast():Signal<IToastType[]> {
    return this.toastText.asReadonly();
  }
}
