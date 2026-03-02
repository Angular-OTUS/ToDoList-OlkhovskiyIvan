import { Component, signal } from '@angular/core';
import { ToDoList } from "./components/to-do-list/to-do-list";
import { ImgPath } from './models/constants';
import { ToastsComponent } from "./components/toasts-component/toasts-component";

@Component({
  selector: 'app-root',
  imports: [ToDoList, ToastsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('to_do_list');
  public img = ImgPath;
}
