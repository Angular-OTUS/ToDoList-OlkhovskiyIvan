import { Component, computed, signal, Signal } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { IToastType } from '../../models/interfaces';
import { NgOptimizedImage } from '@angular/common';
import { ImgPath, MessageTypes } from '../../models/constants';

@Component({
  selector: 'app-toasts-component',
  imports: [NgOptimizedImage],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
})
export class ToastsComponent {


  protected imgPath = ImgPath;  
  protected messageType = MessageTypes;  
  protected toastMessage = computed(() => this.toastService.getToast()());
  constructor(private toastService: ToastService) { }

  getImg(type:MessageTypes):ImgPath {
    switch(type) {
      case MessageTypes.info: return ImgPath.info;
      case MessageTypes.error: return ImgPath.error;
      case MessageTypes.warning: return ImgPath.warning;
    }    
  }

  getAlt(type: MessageTypes):string {
    switch(type) {
      case MessageTypes.info: return "Info";
      case MessageTypes.error: return "Error";
      case MessageTypes.warning: return "Warning";
    }  
  }

  closeMessage(index: number) {
    this.toastService.remove(index);
  }  

}
