import { Component, input, InputSignal } from '@angular/core';
import { ITaskType } from '../../models/interfaces';

@Component({
  selector: 'app-item-description',
  imports: [],
  templateUrl: './item-description.html',
  styleUrl: './item-description.scss',
})
export class ItemDescription {
  public taskItem: InputSignal<ITaskType | undefined> = input<ITaskType>();
}
