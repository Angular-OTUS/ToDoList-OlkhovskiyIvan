import { Component } from '@angular/core';
import { ConstImgValue } from '../../constants';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  public img = ConstImgValue;
}
