import { ChangeDetectionStrategy, Component, computed, input, InputSignal, output, Signal } from '@angular/core';
import { buttonType, ImgPath } from '../../models/constants';
import { NgOptimizedImage } from '@angular/common';
import { Tooltip } from '../../directives/tooltip';

@Component({
  selector: 'app-button-component',  
  templateUrl: './button-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, Tooltip],
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  
  protected buttonAlt: Signal<string | undefined> = computed(() => Object.entries(ImgPath).find(([key, val]) => key && val === this.buttonImg())?.[0]);  
  public buttonImg: InputSignal<string> = input.required<string>();
  public type: InputSignal<buttonType> = input.required<buttonType>();  
  public tooltipText: InputSignal<string> = input.required<string>();
  public disable: InputSignal<boolean> = input<boolean>(false);
  public clickButton = output<PointerEvent>();

}
