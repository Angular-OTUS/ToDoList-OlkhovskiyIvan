import { NgOptimizedImage } from '@angular/common';
import { buttonType, ImgPath } from '../../models/constants';
import { ButtonComponent } from "../button-component/button-component";
import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  public buttonType = buttonType;
  protected  img = ImgPath;
  public taskName: InputSignal<string> = input.required<string>();
  public isSelect: InputSignal<boolean> = input<boolean>(false);
  protected delTask = output();
  protected clickTask = output();

  onClickButton(event: PointerEvent) {
    this.delTask.emit();
    event.stopPropagation();
  }

}
