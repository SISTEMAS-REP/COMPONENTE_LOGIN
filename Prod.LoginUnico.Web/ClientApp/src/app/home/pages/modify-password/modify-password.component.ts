import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModifyPasswordFirstStepComponent } from './components/modify-password-first-step/modify-password-first-step.component';
import { ModifyPasswordSecondStepComponent } from './components/modify-password-second-step/modify-password-second-step.component';
import { ModifyPasswordSuccessStepComponent } from './components/modify-password-success-step/modify-password-success-step.component';
import { ToastService } from 'src/app/services/toast.service';
import { enumerados } from 'src/app/enums/enumerados';
import { ProfileRepository } from '../../repositories/profile.repository';
import { ProfileResponse } from '../../interfaces/response/profile.response';
import { ModificationPasswordRequest } from '../../interfaces/request/modification-password.request';
import { ModificationPasswordRepository } from '../../repositories/modification-password.repository';


@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html'
})
export class ModifyPasswordComponent implements OnInit {
  @ViewChild('firstStep') firstStep?: ModifyPasswordFirstStepComponent;
  @ViewChild('secondStep') secondStep?: ModifyPasswordSecondStepComponent;
  @ViewChild('successStep') successStep?: ModifyPasswordSuccessStepComponent;
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;
  enumerado: enumerados = new enumerados();
  profileResponse?: ProfileResponse;
  applicationId: number = 0;
  returnUrl?: string = '';
  logo?: SafeUrl;
  ModificationPasswordRequest?: ModificationPasswordRequest;
  validaSuccess : boolean = true;


  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modificationPasswordRepository: ModificationPasswordRepository,
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private profileRepository: ProfileRepository,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('queryParams', params);
      this.applicationId = params['applicationId'] || 0;
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnInit(): void {
    this.stepper = new Stepper(this.steps.nativeElement, {
      linear: true,
      animation: true,
    });
    this.loadLogo();
    this.findProfile();
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.modificationPasswordRepository.logo(request).subscribe({
      next: (data) => {
        this.spinner.hide();
        let objectURL = 'data:image/png;base64,' + data;
        this.logo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        this.spinner.hide();
        console.log('loadLogo-error', err);
      },
    });
  }


  findProfile() {
    this.spinner.show();
    this.profileRepository.findProfile().subscribe({
      next: (data: ProfileResponse) => {
        this.spinner.hide();
        this.profileResponse = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('getExtranetAccount-error', err);

        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }
 
  
  sendForm($event: ModificationPasswordRequest) {
    this.ModificationPasswordRequest = $event;
    this.ModificationPasswordRequest.applicationId = this.applicationId;
  }

  evalChangePassword() {
    if (!this.ModificationPasswordRequest) {
      console.log('evalChangePassword', 'ChangePasswordRequest is null or undefined');
      return;
    }
  }


  onPreviewStep() {
    this.stepper?.previous();
  }

  onNextStep($event: any) {
    var data = $event.data as ModificationPasswordRequest;

    this.ModificationPasswordRequest = {
      ...this.ModificationPasswordRequest,
      ...data,
    };
    console.log('onNextStep', this.ModificationPasswordRequest);

    this.modificationPasswordRepository.validateCurrentPassword(this.ModificationPasswordRequest, "").subscribe({
      next: (data: any) => {
        if(data.succeeded)
        {
          if (!$event.finish) {
            this.stepper?.next();
            return;
          }
        }
        else 
         this.toastService.danger("Revise la credencial ingresada", "Error");
        
      },
      error: (err) => {
        console.log('getExtranetAccount-error', err);
        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }

  onNextStep2($event: any) {
    var data = $event.data as ModificationPasswordRequest;

    this.ModificationPasswordRequest = {
      ...this.ModificationPasswordRequest,
      ...data,
    };
    console.log('onNextStep', this.ModificationPasswordRequest);

    this.modificationPasswordRepository.modificationPassword(this.ModificationPasswordRequest, "").subscribe({
      next: () => {
        this.spinner.hide();
        console.log('registerPerson-next', 'register success');
        if (!$event.finish) {
          this.stepper?.next();
          this.validaSuccess = false;  
          return;
        }     
      },
      error: (err) => {
        this.spinner.hide();
        console.log('modifyPassword-error', err);
        this.toastService.danger(err.error?.detail, err.error?.title);
      },
    });
}
   

  onReturnUrl() {
    if (!this.returnUrl) {
      this.toastService.danger('Dirección de retorno inválida.');
      return;
    }

    window.location.href = this.returnUrl;
  }
}

