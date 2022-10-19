import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilePersonComponent } from './pages/profile-person/profile-person.component';
import { ProfileCompanyComponent } from './pages/profile-company/profile-company.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProfileFormComponent } from './pages/profile/components/profile-form/profile-form.component';
import { CompanyUsersComponent } from './pages/company-users/company-users.component';
import { CompanyUsersFormComponent } from './pages/company-users/components/company-users-form/company-users-form.component';
import { CompanyUsersModalComponent } from './pages/company-users/components/company-users-modal/company-users-modal.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterCompanyUserFirstStepComponent } from './pages/company-users/components/register-company-user-first-step/register-company-user-first-step.component';
import { RegisterCompanyUserSecondStepComponent } from './pages/company-users/components/register-company-user-second-step/register-company-user-second-step.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RECAPTCHA_V3_SITE_KEY} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ApplicationsUserComponent } from './pages/applications-user/applications-user.component';
import { ModifyPasswordComponent } from './pages/modify-password/modify-password.component';
import { ModifyPasswordFirstStepComponent } from './pages/modify-password/components/modify-password-first-step/modify-password-first-step.component';
import { ModifyPasswordSecondStepComponent } from './pages/modify-password/components/modify-password-second-step/modify-password-second-step.component';
import { ModifyPasswordSuccessStepComponent } from './pages/modify-password/components/modify-password-success-step/modify-password-success-step.component';



@NgModule({
  declarations: [
    HomeComponent,
    ApplicationsComponent,
    ProfileComponent,
    ProfilePersonComponent,
    ProfileCompanyComponent,
    ProfileFormComponent,
    CompanyUsersComponent,
    CompanyUsersFormComponent,
    CompanyUsersModalComponent,
    RegisterCompanyUserFirstStepComponent,
    RegisterCompanyUserSecondStepComponent,
    ApplicationsUserComponent,
    ModifyPasswordComponent,
    ModifyPasswordFirstStepComponent,
    ModifyPasswordSecondStepComponent,
    ModifyPasswordSuccessStepComponent,
  ],
  imports: [
    CollapseModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxSpinnerModule,

    SharedModule,

    RouterModule,
    HomeRoutingModule,
    
  ],
  providers: [BsModalService,{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey,
  }],

})
export class HomeModule {}
