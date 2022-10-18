import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyUsersComponent } from './pages/company-users/company-users.component';
import { ModificationPasswordPersonComponent } from './pages/modification-password-person/modification-password-person.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'apps', pathMatch: 'full' },
      {
        path: 'apps',
        component: ApplicationsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      } /* ,
      {
        path: 'profile-person',
        component: ProfilePersonComponent,
      },
      {
        path: 'profile-company',
        component: ProfileCompanyComponent,
      }, */,
      {
        path: 'company-users',
        component: CompanyUsersComponent,
      },
      {
        path: 'modification-password-person',
        component: ModificationPasswordPersonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
