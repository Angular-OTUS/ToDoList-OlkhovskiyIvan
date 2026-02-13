import { NgOptimizedImage } from '@angular/common';
import { buttonType, ImgPath } from '../../models/constants';
import { ButtonComponent } from "../button-component/button-component";
import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { Tooltip } from '../../directives/tooltip';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgOptimizedImage, Tooltip],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {

  protected buttonType = buttonType;
  protected img = ImgPath;
  public taskName: InputSignal<string> = input.required<string>();
  public isSelect: InputSignal<boolean> = input<boolean>(false);
  public delTask = output();
  public clickTask = output();

  onClickButton(event: PointerEvent) {
    this.delTask.emit();
    event.stopPropagation();
  }

}
