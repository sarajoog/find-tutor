import { DatePipe } from '@angular/common';
import { Routes } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const AUTH_ROUTES: Routes = [
    {
      path: '',
      children: [
        {
          path: 'sign-in',
          loadComponent: () => 
            import('@features/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
        },
        {
          path: 'register',
          loadComponent: () => 
            import('@features/auth/register/register.component').then(m => m.RegisterComponent)
        },
        {
          path: 'forgot-password',
          loadComponent: () => 
            import('@features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
        }
      ],
      providers: [AuthService]
    }
  ];