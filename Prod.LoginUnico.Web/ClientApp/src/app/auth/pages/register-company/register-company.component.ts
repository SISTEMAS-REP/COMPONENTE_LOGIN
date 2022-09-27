import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { RegisterRepository } from '../../repositories/register.repository';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RegisterRequest } from '../../interfaces/request/register.request';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ReniecRequest } from '../../interfaces/request/reniec.request';
import { ReniecResponse } from '../../interfaces/response/reniec.response';
import { SunatRequest } from '../../interfaces/request/sunat.request';
import { SunatResponse } from '../../interfaces/response/sunat.response';
import { RegisterCompanyFirstStepComponent } from './components/register-company-first-step/register-company-first-step.component';
import { RegisterCompanySecondStepComponent } from './components/register-company-second-step/register-company-second-step.component';
import { RegisterCompanyFourthStepComponent } from './components/register-company-fourth-step/register-company-fourth-step.component';
import { RegisterCompanyThirdStepComponent } from './components/register-company-third-step/register-company-third-step.component';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
})
export class RegisterCompanyComponent implements OnInit {
  @ViewChild('firstStep') firstStep?: RegisterCompanyFirstStepComponent;
  @ViewChild('secondStep') secondStep?: RegisterCompanySecondStepComponent;
  @ViewChild('thirdStep') thirdStep?: RegisterCompanyThirdStepComponent;
  @ViewChild('fourthStep') fourthStep?: RegisterCompanyFourthStepComponent;
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;

  applicationId: number = 0;
  returnUrl: string = "";
  logo?: SafeUrl;

  sunatResponse?: SunatResponse;
  reniecResponse?: ReniecResponse;

  registerRequest?: RegisterRequest;
  recaptchaToken?: string;

  constructor(
    private registerRepository: RegisterRepository,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.router.queryParams.subscribe((params) => {
      console.log("queryParams", params);
      this.applicationId = params['applicationId'] || 0;
      this.returnUrl = params['returnUrl'] || "";
    });
  }

  ngOnInit(): void {
    this.stepper = new Stepper(this.steps.nativeElement, {
      linear: true,
      animation: true,
    });

    this.loadLogo();
  }

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refreshRegisterForm() {
    console.log('refreshRegisterForm', 'clear all parameters of stepper form');
    this.firstStep?.resetFormFields();
    this.secondStep?.resetFormFields();
    this.thirdStep?.resetFormFields();
    this.fourthStep?.resetFormFields();
  }

  refresh() {
    this.refreshRecaptchaToken();
    this.refreshRegisterForm();
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.registerRepository.logo(request).subscribe({
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

  onSendRucNumber($event: any) {
    //console.log('onSendRucNumber', $event);
    this.spinner.show();
    var request: SunatRequest = {
      rucNumber: $event,
    };
    this.registerRepository.sunat(request).subscribe({
      next: (data: SunatResponse) => {
        this.spinner.hide();
        console.log('onSendRucNumber-next', data);

        this.sunatResponse = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('onSendRucNumber-error', err);
      },
    });
  }

  onSendDocumentNumber($event: string) {
    //console.log('onSendDocumentNumber', $event);
    this.spinner.show();
    var request: ReniecRequest = {
      documentNumber: $event,
    };
    this.registerRepository.reniec(request).subscribe({
      next: (data: ReniecResponse) => {
        this.spinner.hide();
        console.log('onSendDocumentNumber-next', data);

        this.reniecResponse = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('onSendDocumentNumber-error', err);
      },
    });
  }

  onPreviewStep() {
    this.stepper?.previous();
  }

  onNextStep($event: any) {
    var data = $event.data as RegisterRequest;

    this.registerRequest = {
      ...this.registerRequest,
      ...data,
    };
    console.log('onNextStep', this.registerRequest);

    if (!$event.finish) {
      this.stepper?.next();
      return;
    }

    this.setReCAPTCHA();
  }

  setReCAPTCHA() {
    this.refreshRecaptchaToken();

    this.spinner.show();
    this.recaptchaV3Service.execute('registerSubmit').subscribe({
      next: (token) => {
        console.log('setReCAPTCHA-next', token);
        this.recaptchaToken = token;
        this.evalRegister();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('setReCAPTCHA-error', err);
      },
    });
  }

  evalRegister() {
    if (!this.registerRequest) {
      console.log('evalRegister', 'registerRequest is null or undefined');
      return;
    }

    if (!this.recaptchaToken) {
      console.log('evalRegister', 'recaptchaToken is null or undefined');
      return;
    }

    this.registerCompany();
  }

  registerCompany() {
    //this.spinner.show();
    this.registerRepository
      .registerCompany(this.registerRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('registerCompany-next', 'register success');

          this.refresh();
        },
        error: (err) => {
          this.spinner.hide();
          console.log('registerCompany-error', err);

          //this.refresh();
        },
      });
  }
}
