import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch:'full'
    },
    {
        path: 'backlog',
        loadComponent: ()=>import('./pages/backlog/backlog').then(c => c.Backlog),   
    },
    {
        path: 'backlog/:selectedItemId',
        loadComponent: ()=>import('./pages/backlog/backlog').then(c => c.Backlog)       
    },    
    {
        path: 'board',
        loadComponent: ()=>import('./pages/board/board').then(c => c.Board)       
    },
    {
        path: '**',
        redirectTo: 'board',
        pathMatch: 'full'
    }
];
