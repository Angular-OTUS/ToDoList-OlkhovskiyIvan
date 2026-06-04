import { Component, inject } from '@angular/core';
import { mainMenuConfig } from './models/constants';
import { ToastsComponent } from "./components/toasts-component/toasts-component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { IMainMenuType } from './models/interfaces';
import { filter, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ToastsComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected mainMenu: IMainMenuType[] = mainMenuConfig;
  protected router = inject(Router);

  protected router_events = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event) => {
        let selectManu = this.mainMenu.find(item => event.urlAfterRedirects.includes(item.rout) );
        if (selectManu) selectManu.isSelect = true;        
      })
    )
  );

  onClickManu(item: IMainMenuType) {
    if (item.isSelect) return;
    this.mainMenu.forEach(i => i.isSelect = false);    
    this.router.navigate([item.rout]);
  }

}
