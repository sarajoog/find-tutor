import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => 
      import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'register',
    loadComponent: () => 
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => 
      import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./features/account/dashboard/dashboard.component').then(m => m.DashboardComponent)
  }
];
