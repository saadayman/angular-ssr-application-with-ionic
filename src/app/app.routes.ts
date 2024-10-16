import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'test',
        loadComponent:()=>import('./components/page1/page1.component').then(c=>c.Page1Component)
    }
];
