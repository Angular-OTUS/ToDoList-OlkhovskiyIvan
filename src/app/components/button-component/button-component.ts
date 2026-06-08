import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { ButtonTypes } from '../../models/constants';
import { Tooltip } from '../../directives/tooltip';

@Component({
  selector: 'app-button-component',  
  templateUrl: './button-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tooltip],
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
    
  public type: InputSignal<ButtonTypes> = input.required<ButtonTypes>();  
  public tooltipText: InputSignal<string> = input.required<string>();
  public disable: InputSignal<boolean> = input<boolean>(false);
  public clickButton = output<PointerEvent>();
  public typeButton = input<string>('button');

}
