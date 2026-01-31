import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { ConstImgValue } from '../../models/constants';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  protected  img = ConstImgValue;
  public taskName: InputSignal<string> = input.required<string>();
  protected delTask = output();

  onClickDell() {
    this.delTask.emit();
  }

}
