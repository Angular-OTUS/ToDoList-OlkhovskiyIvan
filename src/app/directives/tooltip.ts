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
  public visibleTooltip: InputSignal<boolean> = input<boolean>(true);
  private tooltipElement!: HTMLElement | null;
  private timeOut!: number | null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnDestroy() {
    this.tooltipDel();
  }

  delTimeOut() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  tooltipAdd() {

    if (!this.visibleTooltip() || this.timeOut || this.tooltipElement) return;

    this.timeOut = setTimeout(() => { 

      this.tooltipElement = document.body.querySelector('.app-tooltip');

      if (!this.tooltipElement) {
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltipElement, 'app-tooltip');        
        this.renderer.appendChild(document.body, this.tooltipElement);
      }

      if (this.tooltipElement) this.tooltipElement.textContent = this.appTooltip();    
      this.setTooltipProperties();

    }, this.delayTooltip());

  }

  private setTooltipProperties() {

    if (!this.tooltipElement) return;

    const hostPos = this.elRef.nativeElement.getBoundingClientRect();    
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
