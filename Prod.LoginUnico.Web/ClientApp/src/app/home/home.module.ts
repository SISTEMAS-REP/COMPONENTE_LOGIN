import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [ApplicationsComponent, ProfileComponent],
  imports: [CommonModule],
})
export class HomeModule {}
