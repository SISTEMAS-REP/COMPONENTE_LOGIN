import { Component, isDevMode, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRequest } from '../../interfaces/request/login.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginRepository } from '../../repositories/login.repository';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LoginPersonFormComponent } from './components/login-person-form/login-person-form.component';
import { enumerados } from 'src/app/enums/enumerados';
import { ToastService } from '../../../services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-person',
  templateUrl: './login-person.component.html',
})
export class LoginPersonComponent implements OnInit {
  @ViewChild('loginForm') loginForm?: LoginPersonFormComponent;

  applicationId: number = 0;
  returnUrl?: string = '';
  logo?: SafeUrl;

  loginRequest?: LoginRequest;
  recaptchaToken?: string;

  enums = new enumerados();

  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private loginRepository: LoginRepository,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.returnUrl = params['returnUrl'];
      this.loadLogo();
    });
  }

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refreshLoginForm() {
    console.log('refreshLoginForm', 'clear all parameters of stepper form');
    this.loginForm?.resetFormFields();
  }

  refresh() {
    this.refreshRecaptchaToken();
    this.refreshLoginForm();
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.loginRepository.logo(request).subscribe({
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

  sendForm($event: LoginRequest) {
    this.loginRequest = $event;

    this.loginRequest.personType = this.enums.TIPO_PERSONA.NATURAL;
    this.loginRequest.applicationId = this.applicationId;
    this.loginRequest.rememberMe = false;

    this.setReCAPTCHA();
  }

  setReCAPTCHA() {
    this.refreshRecaptchaToken();

    this.spinner.show();
    this.recaptchaV3Service.execute('loginSubmit').subscribe({
      next: (token) => {
        console.log('setReCAPTCHA-next', token);
        this.recaptchaToken = token;
        this.evalLogIn();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('setReCAPTCHA-error', err);
      },
    });
  }

  evalLogIn() {
    if (!this.loginRequest) {
      this.spinner.hide();
      console.log('evalLogIn', 'loginRequest is null or undefined');
      return;
    }

    if (!this.recaptchaToken) {
      this.spinner.hide();
      console.log('evalLogIn', 'recaptchaToken is null or undefined');
      return;
    }

    this.loginPerson();
  }

  loginPerson() {
    this.loginRepository
      .loginPerson(this.loginRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('loginPerson-next', 'login success');

          this.refresh();

          this.toastService.success('Login success');

          //window.location.href = this.returnUrl;
          /*
        TODO: REDIRECT
        */
        },
        error: (err) => {
          this.spinner.hide();
          console.log('loginPerson-error', err);

          this.refreshRecaptchaToken();
          this.toastService.danger(err.error?.detail, err.error?.title);
        },
      });
  }

  onCancel() {
    if (this.returnUrl) {
      window.location.href = this.returnUrl;
    } else {
      this.router.navigate(['presentation']);
    }
  }
}
