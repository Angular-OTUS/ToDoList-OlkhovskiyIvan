import { NgOptimizedImage } from '@angular/common';
import { ButtonType, ImgPath, MessageType } from '../../models/constants';
import { ButtonComponent } from "../button-component/button-component";
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, OnInit, output, signal, Signal, WritableSignal } from '@angular/core';
import { Tooltip } from '../../directives/tooltip';
import { FormsModule } from '@angular/forms';
import { Autoselect } from '../../directives/autofocus';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, FormsModule, NgOptimizedImage, Tooltip, Autoselect],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  protected buttonType = ButtonType;
  protected img = ImgPath;
  protected isEdit: WritableSignal<boolean> = signal(false);  
  protected newTaskName: string = "";
  public taskName: InputSignal<string> = input.required<string>();
  public isSelect: InputSignal<boolean> = input<boolean>(false);
  public delTask = output();
  public clickTask = output();  
  public updateTask = output<string>();  

  constructor(private toastService: ToastService) {}

  onClickButton(event: PointerEvent) {
    this.delTask.emit();
    event.stopPropagation();    
  }

  keypressTask(event: KeyboardEvent, value: string) {
    this.newTaskName = value;
    if(event.code == "Enter") this.onClickSave();
  }  

  onClickSave(event?: PointerEvent) {

    if (this.newTaskName.trim() === "") {
      this.toastService.show("Необходимо указать наименование задачи перед сохранением.", MessageType.error, 7000);
      return;
    }

    this.isEdit.set(false);
    this.updateTask.emit(this.newTaskName);
    if (event) event.stopPropagation();
  }

}
