import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { NgOptimizedImage } from '@angular/common';
import { ImgPath, MessageTypes } from '../../models/constants';

@Component({
  selector: 'app-toasts-component',
  imports: [NgOptimizedImage],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent {

  protected imgPath = ImgPath;  
  protected messageType = MessageTypes;  
  private toastService = inject(ToastService);
  protected toastMessage = computed(() => this.toastService.getToast()());

  getImg(type:MessageTypes):ImgPath {
    switch(type) {
      case MessageTypes.info: return ImgPath.info;
      case MessageTypes.error: return ImgPath.error;
      case MessageTypes.warning: return ImgPath.warning;
      default: return ImgPath.info;
    }    
  }

  getAlt(type: MessageTypes):string {
    switch(type) {
      case MessageTypes.info: return "Info";
      case MessageTypes.error: return "Error";
      case MessageTypes.warning: return "Warning";
      default: return "Info";
    }  
  }

  closeMessage(index: number) {
    this.toastService.remove(index);
  }  

}
