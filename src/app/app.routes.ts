import { Routes } from '@angular/router';
import { authGuard } from './pages/login/services/guards/auth.guard';

export const routes: Routes = [
    {
        path:'test',
        loadComponent:()=>import('./components/page1/page1.component').then(c=>c.Page1Component)
    },
    {
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
		canActivate:[authGuard]
	},
    // {
    //     path:'',
    //     redirectTo:'login',
    //     pathMatch:'full'
    // }

];
