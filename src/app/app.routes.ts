import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/home/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    {
        path: 'dashboard', canActivate: [authenticationGuard], component: HomeComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ]
    },
    { path: '**', redirectTo: () => 'login' }
];
