import { Component, computed, input, InputSignal, output, Signal } from '@angular/core';
import { buttonType, ConstImgValue } from '../../models/constants';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-button-component',  
  templateUrl: './button-component.html',
  imports: [NgOptimizedImage],
  styleUrl: './button-component.scss',
})
export class ButtonComponent {

  public buttonImg: InputSignal<string> = input.required<string>();
  protected buttonAlt: Signal<string | undefined> = computed(() => Object.entries(ConstImgValue).find(([key, val]) => key && val === this.buttonImg())?.[0]);
  public type: InputSignal<buttonType> = input.required<buttonType>();  
  public disable: InputSignal<boolean> = input<boolean>(false);
  public clickButton = output();

}
