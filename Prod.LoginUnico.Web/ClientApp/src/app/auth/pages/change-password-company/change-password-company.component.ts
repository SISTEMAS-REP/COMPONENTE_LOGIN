import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangePasswordRequest } from '../../interfaces/request/change-password.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { ChangePasswordRepository } from '../../repositories/change-password.repository';
import { enumerados } from 'src/app/enums/enumerados';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ChangePasswordCompanyFormComponent } from './components/change-password-company-form/change-password-company-form.component';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-change-password-company',
  templateUrl: './change-password-company.component.html'
})
export class ChangePasswordCompanyComponent implements OnInit {
  @ViewChild('changePasswordCompanyForm') changePasswordCompanyForm?: ChangePasswordCompanyFormComponent;
  applicationId: number = 0;
  Identificador: string = "";
  Code: string = "";
  Email: string = "";
  UserName: string = "";

  logo?: SafeUrl;

  ChangePasswordRequest?: ChangePasswordRequest;
  recaptchaToken?: string;

  enums = new enumerados();

  constructor(
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private ChangePasswordRepository: ChangePasswordRepository,
    private sanitizer: DomSanitizer,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.Identificador = params['Identificador'] || null;
      this.Code = params['Code'] || null;
      this.Email = params['Email'] || null;
      this.UserName = params['UserName'] || null;
      this.loadLogo();
    });
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.ChangePasswordRepository.logo(request).subscribe({
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

  sendForm($event: ChangePasswordRequest) {
    this.ChangePasswordRequest = $event;

    this.ChangePasswordRequest.personType = this.enums.TIPO_PERSONA.JURIDICA;
    this.ChangePasswordRequest.applicationId = this.applicationId;
    this.ChangePasswordRequest.Identificador = this.Identificador;
    this.ChangePasswordRequest.Code = this.Code;
    this.ChangePasswordRequest.Email = this.Email;
    this.ChangePasswordRequest.UserName = this.UserName;


    this.setReCAPTCHA();
  }

  setReCAPTCHA() {
    this.refreshRecaptchaToken();

    this.spinner.show();
    this.recaptchaV3Service.execute('changePasswordSubmit').subscribe({
      next: (token) => {
        console.log('setReCAPTCHA-next', token);
        this.recaptchaToken = token;
        this.evalChangePassword();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('setReCAPTCHA-error', err);
      },
    });
  }

  evalChangePassword() {
    debugger;
    if (!this.ChangePasswordRequest) {
      console.log('evalChangePassword', 'ChangePasswordRequest is null or undefined');
      return;
    }

    if (!this.recaptchaToken) {
      console.log('evalChangePassword', 'recaptchaToken is null or undefined');
      return;
    }

    this.changePasswordCompany();
  }


  changePasswordCompany() {
    debugger;
    this.ChangePasswordRepository
      .changePasswordCompany(this.ChangePasswordRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('changePasswordCompany-next', 'ChangePassword success');

          this.refresh();

          this.toastService.success('ChangePassword success');

        },
        error: (err) => {
          this.spinner.hide()
          console.log('changePasswordCompany-error', err);

          this.refreshRecaptchaToken();
          this.toastService.danger(err.error.detail, err.error.title);
        },
      });
  }
  

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refreshChangePasswordForm() {
    console.log('refreshLoginForm', 'clear all parameters of stepper form');
    this.changePasswordCompanyForm?.resetFormFields();
  }

  refresh() {
    this.refreshRecaptchaToken();
    this.refreshChangePasswordForm();
  }


  sendCancel() {
    this.toastService.danger('Cancel button pressed.', 'Cancel');
  }

}

