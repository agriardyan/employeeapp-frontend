import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// TODO import home.component

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },

    // otherwise
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
