import { Component, output, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from "../button-component/button-component";
import { ButtonTypes, ImgPath, MessageTypes, StatusTaskTypes } from '../../models/constants';
import { NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { INewTaskType, ITaskType } from '../../models/interfaces';
import { ToDoListService } from '../../services/to-do-list-service';
import { ToastService } from '../../services/toast-service';
import { RestService } from '../../services/rest-service';

@Component({
  selector: 'app-todo-create-item',
  imports: [ButtonComponent, NgOptimizedImage, FormsModule, MatInputModule,],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.scss',
})
export class TodoCreateItem {

  protected buttonType = ButtonTypes;
  protected img = ImgPath;
  protected newTask: INewTaskType = { text: '', description: '' };
  public addTask = output<ITaskType>();  

  constructor(private toDoListService:ToDoListService, 
              private restService: RestService,
              private toastService: ToastService) {

              }

  onSubmit(form: NgForm) {


    if(form.valid) {
      const newItem:ITaskType = {
        id: this.toDoListService.getNewID() + 1,
        text: this.newTask.text,
        description: this.newTask.description,
        status: StatusTaskTypes.inProgress
      }
  
      this.restService.createTask(newItem).subscribe(() => {
  
        this.addTask.emit(newItem);
        this.toastService.show("Новая задача успешно добавлена в список дел!", MessageTypes.info);
        form.resetForm();
      });      
    }
  }
  
}
