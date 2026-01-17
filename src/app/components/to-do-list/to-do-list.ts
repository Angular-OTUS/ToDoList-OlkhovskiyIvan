import { Component } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { ConstImgValue } from '../../constants';

@Component({
  selector: 'app-to-do-list',
  imports: [TodoItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  public img = ConstImgValue;
}
