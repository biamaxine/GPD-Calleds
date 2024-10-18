import { Routes } from '@angular/router';

import { AuthComponent } from './views/auth/auth.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  { path: 'auth/sign-up', pathMatch: 'full', redirectTo: '/auth' },
  { path: 'auth/sign-in', pathMatch: 'full', redirectTo: '/auth' },
  { path: 'auth/admin/sign-in', pathMatch: 'full', redirectTo: '/auth' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
];
