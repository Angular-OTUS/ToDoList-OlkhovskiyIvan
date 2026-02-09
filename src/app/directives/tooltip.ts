import { Directive, ElementRef, input, InputSignal, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'tooltipAdd()',
    '(mouseleave)': 'tooltipDel()',
  },  
})
export class Tooltip {

  public appTooltip: InputSignal<string> = input.required<string>();
  public delayTooltip: InputSignal<number> = input<number>(0);
  private tooltipElement!: HTMLElement | null;
  private timeOut!: number | null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy() {
    this.delTimeOut();
  }

  delTimeOut() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  tooltipAdd() {
    if (this.timeOut || this.tooltipElement) return;

    this.timeOut = setTimeout(() => { 

      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.addClass(this.tooltipElement, 'app-tooltip');
      if (this.tooltipElement) this.tooltipElement.innerHTML = this.appTooltip();    
      this.renderer.appendChild(document.body, this.tooltipElement);
      this.setTooltipProperties();

    }, this.delayTooltip());

  }

  private setTooltipProperties() {

    if (!this.tooltipElement) return;

    const hostPos = this.elRef.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();
    console.log(hostPos)
    console.log(tooltipPos)
    const top = hostPos.top - this.tooltipElement.clientHeight - 5;
    const left = hostPos.left - 16;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);      
  }

  tooltipDel() {    
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
    this.delTimeOut();
  }

}
