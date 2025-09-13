import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    { path: 'dashboard', canActivate: [authenticationGuard] , component: HomeComponent },
    { path: 'register', component: HomeComponent },
    { path: '**', redirectTo: () => 'login' }
];
