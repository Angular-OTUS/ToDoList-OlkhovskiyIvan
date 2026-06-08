import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutoselect]',
})
export class Autoselect implements AfterViewInit {

  private el = inject(ElementRef);

  ngAfterViewInit() {
    this.el.nativeElement.select();
  }

}
