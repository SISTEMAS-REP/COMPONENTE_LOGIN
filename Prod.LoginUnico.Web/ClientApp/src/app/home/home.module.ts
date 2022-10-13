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
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileFormComponent } from './pages/profile/components/profile-form/profile-form.component';
import { CompanyUsersComponent } from './pages/company-users/company-users.component';
import { CompanyUsersFormComponent } from './pages/company-users/components/company-users-form/company-users-form.component';
import { CompanyUsersModalComponent } from './pages/company-users/components/company-users-modal/company-users-modal.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterCompanyUserFirstStepComponent } from './pages/company-users/components/register-company-user-first-step/register-company-user-first-step.component';
import { RegisterCompanyUserSecondStepComponent } from './pages/company-users/components/register-company-user-second-step/register-company-user-second-step.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    HomeComponent,
    ApplicationsComponent,
    ProfileComponent,
    ProfilePersonComponent,
    ProfileCompanyComponent,
    FooterComponent,
    NavbarComponent,
    ProfileFormComponent,
    CompanyUsersComponent,
    CompanyUsersFormComponent,
    CompanyUsersModalComponent,
    RegisterCompanyUserFirstStepComponent,
    RegisterCompanyUserSecondStepComponent,
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
