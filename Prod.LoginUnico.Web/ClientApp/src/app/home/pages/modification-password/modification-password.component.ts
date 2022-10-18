import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModificationPasswordRequest } from '../../interfaces/request/Modification-password.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { ModificationPasswordRepository } from '../../repositories/modification-password.repository';
import { ModificationPasswordFirstStepComponent } from './components/modification-password-first-step/modification-password-first-step.component';
import { ModificationPasswordSecondStepComponent } from './components/modification-password-second-step/modification-password-second-step.component';
import { ProfileResponse } from '../../interfaces/response/profile.response';
import { ProfileRepository } from '../../repositories/profile.repository';
import Stepper from 'bs-stepper';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modification-password',
  templateUrl: './modification-password.component.html'
})
export class ModificationPasswordComponent implements OnInit {
  applicationId: number = 0;
  returnUrl?: string;
  logo?: SafeUrl;
  ModificationPasswordRequest?: ModificationPasswordRequest;
  profile?: ProfileResponse;
  validaSuccess : boolean = false;


  @ViewChild('firstStep') firstStep?: ModificationPasswordFirstStepComponent;
  @ViewChild('secondStep') secondStep?: ModificationPasswordSecondStepComponent;
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;


  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modificationPasswordRepository: ModificationPasswordRepository,
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private profileRepository: ProfileRepository,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.returnUrl = params['returnUrl'];
      this.stepper = new Stepper(this.steps.nativeElement, {
        linear: true,
        animation: true,
      });
      this.loadLogo();
      this.findProfile();
    });
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
    debugger;
    this.spinner.show();
    this.profileRepository.findProfile().subscribe({
      next: (data: ProfileResponse) => {
        debugger;
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

  sendForm($event: ModificationPasswordRequest) {
    this.ModificationPasswordRequest = $event;
    this.ModificationPasswordRequest.applicationId = this.applicationId;
  }


  evalChangePassword() {
    if (!this.ModificationPasswordRequest) {
      console.log('evalChangePassword', 'ChangePasswordRequest is null or undefined');
      return;
    }

    //this.changePasswordPerson();
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
    debugger

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

   

    this.ModificationPasswordRequest.applicationId = this.applicationId;
  }



  onNextStep2($event: any) {
    var data = $event.data as ModificationPasswordRequest;

    this.ModificationPasswordRequest = {
      ...this.ModificationPasswordRequest,
      ...data,
    };
    console.log('onNextStep', this.ModificationPasswordRequest);
    debugger

    this.modificationPasswordRepository.modificationPassword(this.ModificationPasswordRequest, "").subscribe({
      next: (data: any) => {
        //this.validaSuccess = true;  
        this.refresh();
        this.toastService.success('Update success');
        this.onReturnUrl();
      },
      error: (err) => {
        console.log('getExtranetAccount-error', err);
        this.toastService.danger(err.error.detail, err.error.title);
      },
    });

   

    this.ModificationPasswordRequest.applicationId = this.applicationId;
  }




  refreshChangePasswordForm() {
    console.log('refreshLoginForm', 'clear all parameters of stepper form');
    this.firstStep?.resetFormFields();
    this.secondStep?.resetFormFields();
  }



  refresh() {
    this.refreshChangePasswordForm();
  }


  sendCancel() {
    if (this.returnUrl) {
      window.location.href = this.returnUrl;
    } else {
      this.router.navigate(['presentation']);
    }
  }

  onReturnUrl() {
    if (!this.returnUrl) {
      this.toastService.danger('Dirección de retorno inválida.');
      return;
    }

    window.location.href = this.returnUrl;
  }

}

