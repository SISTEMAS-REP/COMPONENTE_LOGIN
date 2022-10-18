import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { RegisterPersonRequest } from '../../interfaces/request/register-person.request';
import { RegisterRepository } from '../../repositories/register.repository';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ReniecRequest } from '../../interfaces/request/reniec.request';
import { ReniecResponse } from '../../interfaces/response/reniec.response';
import { RegisterPersonFirstStepComponent } from './components/register-person-first-step/register-person-first-step.component';
import { RegisterPersonSecondStepComponent } from './components/register-person-second-step/register-person-second-step.component';
import { ToastService } from '../../../services/toast.service';
import { SunatResponse } from '../../interfaces/response/sunat.response';
import { MigracionesResponse } from '../../interfaces/response/migraciones.response';
import { SunatRequest } from '../../interfaces/request/sunat.request';
import { MigracionesRequest } from '../../interfaces/request/migraciones.request';
import { enumerados } from '../../../enums/enumerados';
@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
})
export class RegisterPersonComponent implements OnInit {
  @ViewChild('firstStep') firstStep?: RegisterPersonFirstStepComponent;
  @ViewChild('secondStep') secondStep?: RegisterPersonSecondStepComponent;
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;

  enumerado: enumerados = new enumerados();

  applicationId: number = 0;
  returnUrl?: string = '';
  logo?: SafeUrl;

  sunatResponse?: SunatResponse;
  reniecResponse?: ReniecResponse;
  migracionesResponse?: MigracionesResponse;

  registerRequest?: RegisterPersonRequest;
  recaptchaToken?: string;

  constructor(
    private registerRepository: RegisterRepository,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
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

    //this.stepper?.to(2);
  }

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refreshRegisterForm() {
    console.log('refreshRegisterForm', 'clear all parameters of stepper form');
    this.firstStep?.resetFormFields();
    this.secondStep?.resetFormFields();
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
    var data = $event.data as RegisterPersonRequest;

    this.registerRequest = {
      ...this.registerRequest,
      ...data,
    };
    console.log('onNextStep', this.registerRequest);

    if (!$event.finish) {
      this.stepper?.next();
      return;
    }

    this.registerRequest.applicationId = this.applicationId;
    this.registerRequest.sectorId =
      this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA;
    this.registerRequest.personType = this.enumerado.TIPO_PERSONA.JURIDICA;

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

    this.registerPerson();
  }

  registerPerson() {
    console.log('registerPerson', this.registerRequest);
    //this.spinner.show();
    this.registerRepository
      .registerPerson(this.registerRequest!, this.recaptchaToken!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('registerPerson-next', 'register success');

          this.refresh();
          this.toastService.success('Registro realizado exitosamente', 'Éxito');
          this.onNavigateTo('auth/login-person');
        },
        error: (err) => {
          this.spinner.hide();
          console.log('registerPerson-error', err);

          this.refreshRecaptchaToken();
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

  onNavigateTo(route: string) {
    this.router.navigate([route], {
      queryParamsHandling: 'preserve',
    });
  }
}
