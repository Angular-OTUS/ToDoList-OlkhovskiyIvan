import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoselect]',
})
export class Autoselect implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {    
    this.el.nativeElement.select();
  }

}
