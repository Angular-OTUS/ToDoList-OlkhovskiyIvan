import { Component, signal } from '@angular/core';
import { ImgPath } from './models/constants';
import { ToastsComponent } from "./components/toasts-component/toasts-component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [ToastsComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('to_do_list');
  public img = ImgPath;
}
