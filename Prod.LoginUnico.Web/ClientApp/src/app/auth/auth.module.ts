import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPersonComponent } from './pages/login-person/login-person.component';
import { LoginCompanyComponent } from './pages/login-company/login-company.component';
import { LostPasswordComponent } from './pages/lost-password/lost-password.component';
import { RegisterPersonComponent } from './pages/register-person/register-person.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RegisterPersonFirstStepComponent } from './pages/register-person/components/register-person-first-step/register-person-first-step.component';
import { RegisterPersonSecondStepComponent } from './pages/register-person/components/register-person-second-step/register-person-second-step.component';
import { RegisterCompanyFirstStepComponent } from './pages/register-company/components/register-company-first-step/register-company-first-step.component';
import { RegisterCompanySecondStepComponent } from './pages/register-company/components/register-company-second-step/register-company-second-step.component';
import { RegisterCompanyThirdStepComponent } from './pages/register-company/components/register-company-third-step/register-company-third-step.component';
import { RegisterCompanyFourthStepComponent } from './pages/register-company/components/register-company-fourth-step/register-company-fourth-step.component';
import { OnlyNumbersDirective } from '../helpers/only-numbers.directive';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AuthComponent,
    LoginPersonComponent,
    LoginCompanyComponent,
    LostPasswordComponent,
    RegisterPersonComponent,
    RegisterCompanyComponent,
    RegisterPersonFirstStepComponent,
    RegisterPersonSecondStepComponent,
    RegisterCompanyFirstStepComponent,
    RegisterCompanySecondStepComponent,
    RegisterCompanyThirdStepComponent,
    RegisterCompanyFourthStepComponent,

    OnlyNumbersDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,

    RecaptchaV3Module,

    RouterModule,
    AuthRoutingModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
})
export class AuthModule {}
