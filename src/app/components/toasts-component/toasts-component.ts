import { Component, computed, signal, Signal } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { IToastType } from '../../models/interfaces';
import { NgOptimizedImage } from '@angular/common';
import { ImgPath, MessageType } from '../../models/constants';

@Component({
  selector: 'app-toasts-component',
  imports: [NgOptimizedImage],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
})
export class ToastsComponent {


  protected imgPath = ImgPath;  
  protected messageType = MessageType;  
  protected toastMessage = computed(() => this.toastService.getToast()());
  constructor(private toastService: ToastService) { }

  getImg(type:MessageType):ImgPath {
    switch(type) {
      case MessageType.info: return ImgPath.info;
      case MessageType.error: return ImgPath.error;
      case MessageType.warning: return ImgPath.warning;
    }    
  }

  getAlt(type: MessageType):string {
    switch(type) {
      case MessageType.info: return "Info";
      case MessageType.error: return "Error";
      case MessageType.warning: return "Warning";
    }  
  }

  closeMessage(index: number) {
    this.toastService.remove(index);
  }  

}
