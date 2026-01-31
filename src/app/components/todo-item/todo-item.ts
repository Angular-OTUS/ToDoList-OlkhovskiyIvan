import { ChangeDetectionStrategy, Component, input, Input, InputSignal, output, Signal } from '@angular/core';
import { buttonType, ConstImgValue } from '../../models/constants';
import { ButtonComponent } from "../button-component/button-component";

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  public img = ConstImgValue;
  public bType = buttonType;
  public taskName: InputSignal<string> = input.required<string>();
  public delTask = output();

  onClickDell() {
    this.delTask.emit();
  }

}
