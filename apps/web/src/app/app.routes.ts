import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/puppy-list/puppy-list.component').then(
        (m) => m.PuppyListComponent,
      ),
  },
  {
    path: 'puppies/:id',
    loadComponent: () =>
      import('./components/puppy-details/puppy-details.component').then(
        (m) => m.PuppyDetailsComponent,
      ),
  },

  {
    path: 'adopt/:id',
    loadComponent: () =>
      import('./components/adoption-form/adoption-form.component').then(
        (m) => m.AdoptionFormComponent,
      ),
  },

  {
    path: 'thank-you',
    loadComponent: () =>
      import('./components/thank-you/thank-you.component').then(
        (m) => m.ThankYouComponent,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];
