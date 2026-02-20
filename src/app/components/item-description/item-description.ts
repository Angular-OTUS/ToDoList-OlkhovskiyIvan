import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { ITaskType } from '../../models/interfaces';

@Component({
  selector: 'app-item-description',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-description.html',
  styleUrl: './item-description.scss',
})
export class ItemDescription {
  public taskItem: InputSignal<ITaskType | undefined> = input<ITaskType>();
}
