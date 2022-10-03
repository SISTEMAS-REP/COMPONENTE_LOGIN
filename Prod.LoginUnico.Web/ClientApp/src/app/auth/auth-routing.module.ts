import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginCompanyComponent } from './pages/login-company/login-company.component';
import { LoginPersonComponent } from './pages/login-person/login-person.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';
import { RecoverPasswordCompanyComponent } from './pages/recover-password-company/recover-password-company.component';
import { RecoverPasswordPersonComponent } from './pages/recover-password-person/recover-password-person.component';
import { ChangePasswordCompanyComponent } from './pages/change-password-company/change-password-company.component';
import { ChangePasswordPersonComponent } from './pages/change-password-person/change-password-person.component';

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
      {
        path: 'recover-password-company',
        component: RecoverPasswordCompanyComponent,
      },
      {
        path: 'recover-password-person',
        component: RecoverPasswordPersonComponent,
      },
      {
        path: 'change-password-company',
        component: ChangePasswordCompanyComponent,
      },
      {
        path: 'change-password-person',
        component: ChangePasswordPersonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
