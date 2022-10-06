import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecoverPasswordRequest } from '../../interfaces/request/recover-password.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { RecoverPasswordRepository } from '../../repositories/recover-password.repository';
import { enumerados } from 'src/app/enums/enumerados';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecoverPasswordPersonFormComponent } from './components/recover-password-person-form/recover-password-person-form.component';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-recover-password-person',
  templateUrl: './recover-password-person.component.html'
})
export class RecoverPasswordPersonComponent implements OnInit {
  @ViewChild('recoverPasswordForm') recoverPasswordForm?: RecoverPasswordPersonFormComponent;
  applicationId: number = 0;
  logo?: SafeUrl;

  RecoverPasswordRequest?: RecoverPasswordRequest;
  recaptchaToken?: string;

  enums = new enumerados();


  constructor(
        private spinner: NgxSpinnerService,
        private router: ActivatedRoute,
        private RecoverPasswordRepository: RecoverPasswordRepository,
        private sanitizer: DomSanitizer,
        private recaptchaV3Service: ReCaptchaV3Service,
        private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.loadLogo();
    });
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.RecoverPasswordRepository.logo(request).subscribe({
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

  sendForm($event: RecoverPasswordRequest) {
    this.RecoverPasswordRequest = $event;

    this.RecoverPasswordRequest.personType = this.enums.TIPO_PERSONA.NATURAL;
    this.RecoverPasswordRequest.applicationId = this.applicationId;

    this.setReCAPTCHA();
  }

  setReCAPTCHA() {
    this.refreshRecaptchaToken();

    this.spinner.show();
    this.recaptchaV3Service.execute('recoveryPasswordSubmit').subscribe({
      next: (token) => {
        console.log('setReCAPTCHA-next', token);
        this.recaptchaToken = token;
        this.evalRecoverPassword();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('setReCAPTCHA-error', err);
      },
    });
  }

  evalRecoverPassword() {
    if (!this.RecoverPasswordRequest) {
      console.log('evalRecoverPassword', 'RecoverPasswordRequest is null or undefined');
      return;
    }

    if (!this.recaptchaToken) {
      console.log('evalRecoverPassword', 'recaptchaToken is null or undefined');
      return;
    }

    this.recoverPasswordPerson();
  }


  recoverPasswordPerson() {
    debugger;
    this.RecoverPasswordRepository
      .recoverPasswordPerson(this.RecoverPasswordRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          debugger;
          this.spinner.hide();
          console.log('recoverPasswordPerson-next', 'RecoverPassword success');

          this.refresh();

          this.toastService.success('RecoverPassword success');

        },
        error: (err) => {
          this.spinner.hide();
          console.log('recoverPasswordPerson-error', err);

          this.refreshRecaptchaToken();
          this.toastService.danger(err.error.detail, err.error.title);
        },
      });
  }
  

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refreshRecoverPasswordForm() {
    console.log('refreshLoginForm', 'clear all parameters of stepper form');
    this.recoverPasswordForm?.resetFormFields();
  }

  refresh() {
    this.refreshRecaptchaToken();
    this.refreshRecoverPasswordForm();
  }


  sendCancel() {
    this.toastService.danger('Cancel button pressed.', 'Cancel');
  }

}
