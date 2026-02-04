import { NgOptimizedImage } from '@angular/common';
import { buttonType, ConstImgValue } from '../../models/constants';
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

  public bType = buttonType;
  protected  img = ConstImgValue;
  public taskName: InputSignal<string> = input.required<string>();
  protected delTask = output();

}
