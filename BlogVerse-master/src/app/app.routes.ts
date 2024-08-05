import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'login', component: LoginComponent}
    // {path: '**', component: AppComponent}
];
