import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => 
          import('@features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: 'account/dashboard',
        loadComponent: () => 
          import('@features/account/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'pages/contact',
        loadComponent: () => 
          import('./pages/contact/contact.component').then(m => m.ContactComponent)
      }
    ]
  }
];