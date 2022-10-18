import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModificationPasswordRequest } from '../../interfaces/request/Modification-password.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { ModificationPasswordRepository } from '../../repositories/modification-password.repository';
import { ModificationPasswordPersonFirstStepComponent } from './components/modification-password-person-first-step/modification-password-person-first-step.component';
import { ModificationPasswordPersonSecondStepComponent } from './components/modification-password-person-second-step/modification-password-person-second-step.component';
import { ProfileResponse } from '../../interfaces/response/profile.response';
import { ProfileRepository } from '../../repositories/profile.repository';
import Stepper from 'bs-stepper';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modification-password-person',
  templateUrl: './modification-password-person.component.html'
})
export class ModificationPasswordPersonComponent implements OnInit {
  applicationId: number = 0;
  returnUrl?: string;
  logo?: SafeUrl;
  ModificationPasswordRequest?: ModificationPasswordRequest;
  profile?: ProfileResponse;
  validaSuccess : boolean = false;


  @ViewChild('firstStep') firstStep?: ModificationPasswordPersonFirstStepComponent;
  @ViewChild('secondStep') secondStep?: ModificationPasswordPersonSecondStepComponent;
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
        debugger;
        
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
        debugger
        this.validaSuccess = true;
        debugger;
        
      },
      error: (err) => {
        console.log('getExtranetAccount-error', err);
        this.toastService.danger(err.error.detail, err.error.title);
      },
    });

   

    this.ModificationPasswordRequest.applicationId = this.applicationId;
  }





  // changePasswordPerson() {
  //   this.modificationPasswordRepository
  //     .changePasswordPerson(this.ModificationPasswordRequest!)
  //     .subscribe({
  //       next: (dato : any) => {
  //         this.spinner.hide();
  //         if(this.Verificador){
  //           console.log('changePasswordPerson-next', 'ChangePassword success');
  //           this.isVisibleForm = false;
  //           this.validaSuccess = true;
  //         }
  //         //this.refresh();
  //        // this.toastService.success('ChangePassword success');

  //       },
  //       error: (err) => {
  //         this.spinner.hide()
  //         console.log('changePasswordPerson-error', err);

  //         this.toastService.danger(err.error.detail, err.error.title);
  //       },
  //     });
  // }


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

