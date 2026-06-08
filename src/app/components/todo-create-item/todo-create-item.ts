import { ChangeDetectionStrategy, Component, DestroyRef, inject, output } from '@angular/core';
import { ButtonComponent } from "../button-component/button-component";
import { ButtonTypes, ImgPath, MessageTypes, StatusTaskTypes } from '../../models/constants';
import { NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { INewTaskType, ITaskType } from '../../models/interfaces';
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';
import { RestService } from '../../services/rest-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-create-item',
  imports: [ButtonComponent, NgOptimizedImage, FormsModule, MatInputModule],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateItem {

  protected buttonType = ButtonTypes;
  protected img = ImgPath;
  protected newTask: INewTaskType = { text: '', description: '' };
  public addTask = output<ITaskType>();  

  private toDoListService = inject(ToDoListService);
  private restService = inject(RestService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef); 

  onSubmit(form: NgForm) {

    if (form.invalid) return;
    
    const newItem:ITaskType = {
      id: this.toDoListService.getNewID() + 1,
      text: this.newTask.text,
      description: this.newTask.description,
      status: StatusTaskTypes.inProgress,
    }

    this.restService.createTask(newItem).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {

      this.addTask.emit(newItem);
      this.toastService.show("Новая задача успешно добавлена в список дел!", MessageTypes.info);
      form.resetForm();
    });      
  }
  
}
