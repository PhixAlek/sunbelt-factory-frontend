import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'client-search', loadComponent: () => import('./components/client-search-form/client-search-form.component')
  },
  {
    path: 'client-details', loadComponent: () => import('./components/client-details/client-details.component')
  },
  { path: '', redirectTo: '/client-search', pathMatch: 'full' }
];
