import { Component, signal } from '@angular/core';
import { ToDoList } from "./components/to-do-list/to-do-list";
import { ConstImgValue } from './models/constants';

@Component({
  selector: 'app-root',
  imports: [ToDoList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('to_do_list');
  public img = ConstImgValue;
}
