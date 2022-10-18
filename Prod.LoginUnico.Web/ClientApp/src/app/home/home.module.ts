import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilePersonComponent } from './pages/profile-person/profile-person.component';
import { ProfileCompanyComponent } from './pages/profile-company/profile-company.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProfileFormComponent } from './pages/profile/components/profile-form/profile-form.component';
import { CompanyUsersComponent } from './pages/company-users/company-users.component';
import { CompanyUsersFormComponent } from './pages/company-users/components/company-users-form/company-users-form.component';
import { CompanyUsersModalComponent } from './pages/company-users/components/company-users-modal/company-users-modal.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterCompanyUserFirstStepComponent } from './pages/company-users/components/register-company-user-first-step/register-company-user-first-step.component';
import { RegisterCompanyUserSecondStepComponent } from './pages/company-users/components/register-company-user-second-step/register-company-user-second-step.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModificationPasswordComponent } from './pages/modification-password/modification-password.component';
import { ModificationPasswordFirstStepComponent } from './pages/modification-password/components/modification-password-first-step/modification-password-first-step.component';
import { ModificationPasswordSecondStepComponent } from './pages/modification-password/components/modification-password-second-step/modification-password-second-step.component';

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
    ModificationPasswordComponent,
    ModificationPasswordFirstStepComponent,
    ModificationPasswordSecondStepComponent,
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
  providers: [BsModalService],
})
export class HomeModule {}
