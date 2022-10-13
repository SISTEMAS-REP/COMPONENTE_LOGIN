import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { ProfileRepository } from '../../repositories/profile.repository';
import { ProfileResponse } from '../../interfaces/response/profile.response';
import { ProfileRequest } from '../../interfaces/request/profile.request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})
export class ProfileComponent implements OnInit {
  profile?: ProfileResponse;

  applicationId: number = 0;
  returnUrl: string = '';

  profileRequest?: ProfileRequest;

  constructor(
    private profileRepository: ProfileRepository,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {
    this.router.queryParams.subscribe((params) => {
      console.log('queryParams', params);
      this.applicationId = params['applicationId'] || 0;
      this.returnUrl = params['returnUrl'] || '';
    });
  }

  ngOnInit(): void {
    this.findProfile();
  }

  findProfile() {
    this.spinner.show();
    this.profileRepository.findProfile().subscribe({
      next: (data: ProfileResponse) => {
        this.spinner.hide();
        this.profile = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('getExtranetAccount-error', err);

        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }

  saveForm($event: ProfileRequest) {
    this.profileRequest = $event;
    this.evalUpdate();
  }

  evalUpdate() {
    if (!this.profileRequest) {
      console.log('evalUpdate', 'profileRequest is null or undefined');
    }

    this.updateProfile();
  }

  updateProfile() {
    this.spinner.show();
    this.profileRepository.updateProfile(this.profileRequest!).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastService.success('Perfil actualizado exitosamente', 'Éxito');

        this.profileRequest = undefined;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('updateProfile-error', err);

        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }

  back() {
    window.location.href = this.returnUrl;
  }
}
