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
      },
      {
        path: 'pages/tutors',
        loadComponent: () => 
          import('./pages/tutors/tutors.component').then(m => m.TutorsComponent)
      },
      {
        path: 'pages/courses',
        loadComponent: () => 
          import('./pages/courses/courses.component').then(m => m.CoursesComponent)
      },
      {
        path: 'pages/find-tutor',
        loadComponent: () => 
          import('./pages/find-tutor/find-tutor.component').then(m => m.FindTutorComponent)
      },
      {
        path: 'pages/apply',
        loadComponent: () => 
          import('./pages/apply/apply.component').then(m => m.ApplyComponent)
      },
      {
        path: 'pages/prices',
        loadComponent: () => 
          import('./pages/prices/prices.component').then(m => m.PricesComponent)
      },
      {
        path: 'pages/about',
        loadComponent: () => 
          import('./pages/about/about.component').then(m => m.AboutComponent)
      }   
    ]
  }
];