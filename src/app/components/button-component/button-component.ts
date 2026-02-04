import { Component, input, InputSignal, OnInit, output } from '@angular/core';
import { buttonType } from '../../models/constants';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {

  public buttonImg: InputSignal<string> = input.required<string>();
  public type: InputSignal<buttonType> = input.required<buttonType>();  
  public disable: InputSignal<boolean> = input<boolean>(false);
  public clickButton = output();

  onClick() {
    this.clickButton.emit();    
  }

}
