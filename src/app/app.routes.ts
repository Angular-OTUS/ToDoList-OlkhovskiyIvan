import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch:'full'
    },
    {
        path: 'tasks',
        loadComponent: ()=>import('./components/to-do-list/to-do-list').then(c => c.ToDoList)       
    },
    {
        path: 'tasks/:selectedItemId',
        loadComponent: ()=>import('./components/to-do-list/to-do-list').then(c => c.ToDoList)       
    },
    {
        path: '**',
        redirectTo: 'tasks',
        pathMatch: 'full'
    }
];
