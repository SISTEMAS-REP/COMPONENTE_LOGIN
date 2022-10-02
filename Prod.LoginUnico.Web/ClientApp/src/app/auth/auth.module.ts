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
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { LoginCompanyFormComponent } from './pages/login-company/components/login-company-form/login-company-form.component';
import { LoginPersonFormComponent } from './pages/login-person/components/login-person-form/login-person-form.component';
import { RecoverPasswordPersonComponent } from './pages/recover-password-person/recover-password-person.component';
import { RecoverPasswordCompanyComponent } from './pages/recover-password-company/recover-password-company.component';
import { RecoverPasswordCompanyFormComponent } from './pages/recover-password-company/components/recover-password-company-form/recover-password-company-form.component';
import { RecoverPasswordPersonFormComponent } from './pages/recover-password-person/components/recover-password-person-form/recover-password-person-form.component';

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
    LoginCompanyFormComponent,
    LoginPersonFormComponent,
    RecoverPasswordPersonComponent,
    RecoverPasswordCompanyComponent,
    RecoverPasswordCompanyFormComponent,
    RecoverPasswordPersonFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,

    RecaptchaV3Module,

    NgxSpinnerModule,
    NzModalModule,
    NzNotificationModule,

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
