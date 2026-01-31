import { ChangeDetectionStrategy, Component, input, Input, InputSignal, output, Signal } from '@angular/core';
import { ConstImgValue } from '../../models/constants';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  public img = ConstImgValue;
  public taskName: InputSignal<string> = input.required<string>();
  public delTask = output();

  onClickDell() {
    this.delTask.emit();
  }

}
