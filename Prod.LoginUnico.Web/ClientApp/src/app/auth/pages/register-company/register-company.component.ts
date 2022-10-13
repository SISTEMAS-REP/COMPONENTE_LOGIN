import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { RegisterRepository } from '../../repositories/register.repository';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RegisterCompanyRequest } from '../../interfaces/request/register-company.request';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ReniecRequest } from '../../interfaces/request/reniec.request';
import { ReniecResponse } from '../../interfaces/response/reniec.response';
import { SunatRequest } from '../../interfaces/request/sunat.request';
import { SunatResponse } from '../../interfaces/response/sunat.response';
import { RegisterCompanyFirstStepComponent } from './components/register-company-first-step/register-company-first-step.component';
import { RegisterCompanySecondStepComponent } from './components/register-company-second-step/register-company-second-step.component';
import { RegisterCompanyFourthStepComponent } from './components/register-company-fourth-step/register-company-fourth-step.component';
import { RegisterCompanyThirdStepComponent } from './components/register-company-third-step/register-company-third-step.component';
import { MigracionesResponse } from '../../interfaces/response/migraciones.response';
import { MigracionesRequest } from '../../interfaces/request/migraciones.request';
import { ToastService } from 'src/app/services/toast.service';
import { enumerados } from 'src/app/enums/enumerados';
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

  enumerado: enumerados = new enumerados();

  applicationId: number = 0;
  sectorId: number = 1;
  personType: number = 1;
  returnUrl: string = '';
  logo?: SafeUrl;

  sunatResponse?: SunatResponse;
  reniecResponse?: ReniecResponse;
  migracionesResponse?: MigracionesResponse;

  registerRequest?: RegisterCompanyRequest;
  recaptchaToken?: string;

  constructor(
    private registerRepository: RegisterRepository,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) {
    this.router.queryParams.subscribe((params) => {
      console.log('queryParams', params);
      this.applicationId = params['applicationId'] || 0;
      this.returnUrl = params['returnUrl'] || '';
    });
  }

  ngOnInit(): void {
    this.stepper = new Stepper(this.steps.nativeElement, {
      linear: true,
      animation: true,
    });

    this.loadLogo();

    //this.stepper?.to(3);
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
    console.log('onSendRucNumber', $event);
    this.spinner.show();
    var request: SunatRequest = {
      rucNumber: $event,
    };

    this.searchRucOnSunat(request);
  }

  searchRucOnSunat(request: SunatRequest) {
    if (request) {
      this.spinner.show();
      this.registerRepository.sunat(request).subscribe({
        next: (data: SunatResponse) => {
          this.spinner.hide();
          console.log('searchRucOnSunat-next', data);

          this.sunatResponse = data;
        },
        error: (err) => {
          this.spinner.hide();
          console.log('searchRucOnSunat-error', err);
          this.toastService.danger(err.error?.detail, err.error?.title);

          this.sunatResponse = undefined;
        },
      });
    }
  }

  onSendDocumentNumber($event: any) {
    console.log('onSendDocumentNumber', $event);

    if ($event.documentType == 1) {
      var request: ReniecRequest = {
        documentNumber: $event.documentNumber,
      };
      this.searchDocumentOnReniec(request);
    } else if ($event.documentType == 2) {
      var request: MigracionesRequest = {
        documentNumber: $event.documentNumber,
      };
      this.searchDocumentOnReniec(request);
    }
  }

  searchDocumentOnReniec(request: ReniecRequest) {
    if (request) {
      this.spinner.show();
      this.registerRepository.reniec(request).subscribe({
        next: (data: ReniecResponse) => {
          this.spinner.hide();
          console.log('searchDocumentOnReniec-next', data);

          this.reniecResponse = data;
        },
        error: (err) => {
          this.spinner.hide();
          console.log('searchDocumentOnReniec-error', err);
          this.toastService.danger(err.error?.detail, err.error?.title);

          this.reniecResponse = undefined;
        },
      });
    }
  }

  searchDocumentOnMigraciones(request: MigracionesRequest) {
    if (request) {
      this.spinner.show();
      this.registerRepository.migraciones(request).subscribe({
        next: (data: MigracionesResponse) => {
          this.spinner.hide();
          console.log('searchDocumentOnMigraciones-next', data);

          this.migracionesResponse = data;
        },
        error: (err) => {
          this.spinner.hide();
          console.log('searchDocumentOnMigraciones-error', err);
          this.toastService.danger(err.error?.detail, err.error?.title);

          this.migracionesResponse = undefined;
        },
      });
    }
  }

  onPreviewStep() {
    this.stepper?.previous();
  }

  onNextStep($event: any) {
    var data = $event.data as RegisterCompanyRequest;

    this.registerRequest = {
      ...this.registerRequest,
      ...data,
    };
    console.log('onNextStep', this.registerRequest);

    if (!$event.finish) {
      this.stepper?.next();
      return;
    }

    this.registerRequest.applicationId = this.applicationId
    this.registerRequest.sectorId = this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA;
    this.registerRequest.personType = this.enumerado.TIPO_PERSONA.NATURAL;

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
      this.spinner.hide();
      return;
    }

    if (!this.recaptchaToken) {
      console.log('evalRegister', 'recaptchaToken is null or undefined');
      this.spinner.hide();
      return;
    }

    this.registerCompany();
  }

  registerCompany() {
    console.log('registerCompany', this.registerRequest);
    //this.spinner.show();
    this.registerRepository
      .registerCompany(this.registerRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('registerCompany-next', 'register success');

          this.refresh();
          this.toastService.success('Registro realizado exitosamente', 'Éxito');
        },
        error: (err) => {
          this.spinner.hide();
          console.log('registerCompany-error', err);

          this.refreshRecaptchaToken();
          this.toastService.danger(err.error?.detail, err.error?.title);
        },
      });
  }

  onCancel() {
    this.toastService.warning('Acción para cancelar el registro.', 'Cancelar');
  }
}
