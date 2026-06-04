import { NgOptimizedImage } from '@angular/common';
import { ButtonTypes, ImgPath, MessageTypes } from '../../models/constants';
import { ButtonComponent } from "../button-component/button-component";
import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, output, signal, WritableSignal } from '@angular/core';
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
export class TodoItem implements OnInit {


  protected buttonType = ButtonTypes;
  protected img = ImgPath;
  protected isEdit: WritableSignal<boolean> = signal(false);        
  public taskName: InputSignal<string> = input.required<string>();
  protected newTaskName: string = "";
  public isSelect: InputSignal<boolean> = input<boolean>(false);  
  public isEditTask: InputSignal<boolean> = input<boolean>(true);  
  public delTask = output();
  public clickTask = output();  
  public updateTask = output<string>();  

  private toastService = inject(ToastService);
  
  ngOnInit(): void {
    this.newTaskName = this.taskName();
  }

  onClickButton(event: PointerEvent) {
    this.delTask.emit();
    event.stopPropagation();    
  }

  onDblclickTask() {
    if (!this.isEditTask()) return;
    this.isEdit.set(true);
  }

  keypressTask(event: KeyboardEvent, value: string) {
    this.newTaskName = value;
    if(event.code === "Enter") this.onClickSave();
  }  

  onClickSave(event?: PointerEvent) {

    if (this.newTaskName.trim() === "") {
      this.toastService.show("Необходимо указать наименование задачи перед сохранением.", MessageTypes.error, 7000);
      return;
    }

    this.isEdit.set(false);
    this.updateTask.emit(this.newTaskName);
    if (event) event.stopPropagation();
  }

}
