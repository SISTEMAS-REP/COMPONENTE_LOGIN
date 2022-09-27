import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginCompanyComponent } from './pages/login-company/login-company.component';
import { LoginPersonComponent } from './pages/login-person/login-person.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login-person',
        component: LoginPersonComponent,
      },
      {
        path: 'login-company',
        component: LoginCompanyComponent,
      },
      {
        path: 'lost-password',
        component: LostPasswordComponent,
      },
      {
        path: 'register-person',
        component: RegisterPersonComponent,
      },
      {
        path: 'register-company',
        component: RegisterCompanyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
