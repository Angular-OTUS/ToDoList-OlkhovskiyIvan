import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { ITaskType } from '../../models/interfaces';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StatusTaskTypes } from '../../models/constants';

@Component({
  selector: 'app-item-description',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSlideToggleModule],
  templateUrl: './item-description.html',
  styleUrl: './item-description.scss',
})
export class ItemDescription {

  protected statusTaskTypes = StatusTaskTypes;  
  public taskItem: InputSignal<ITaskType | undefined> = input<ITaskType>();  
  public changeStatus = output<StatusTaskTypes>();

  onChange(event: MatSlideToggleChange) {
    this.changeStatus.emit(event.checked ? StatusTaskTypes.completed : StatusTaskTypes.inProgress);
  }

}
