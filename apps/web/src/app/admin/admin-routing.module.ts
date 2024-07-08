import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagePuppiesComponent } from './manage-puppies/manage-puppies.component';
import { PuppyFormComponent } from './puppy-form/puppy-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'manage-puppies', component: ManagePuppiesComponent },
      {
        path: 'new-puppy',
        component: PuppyFormComponent,
      },

      // {
      //   path: 'manage-puppies',
      //   loadComponent: () =>
      //     import('./manage-puppies/manage-puppies.component').then(
      //       (m) => m.ManagePuppiesComponent,
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
