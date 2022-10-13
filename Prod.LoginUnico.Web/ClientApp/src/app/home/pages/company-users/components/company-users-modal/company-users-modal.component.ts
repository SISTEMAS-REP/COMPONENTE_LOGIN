import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Stepper from 'bs-stepper';
import { RegisterPersonRequest } from 'src/app/auth/interfaces/request/register-person.request';
import { MigracionesResponse } from 'src/app/auth/interfaces/response/migraciones.response';
import { ReniecResponse } from 'src/app/auth/interfaces/response/reniec.response';
import { SunatResponse } from 'src/app/auth/interfaces/response/sunat.response';
import { RegisterCompanyUserFirstStepComponent } from '../register-company-user-first-step/register-company-user-first-step.component';
import { RegisterCompanyUserSecondStepComponent } from '../register-company-user-second-step/register-company-user-second-step.component';
import { CompanyUsersRepository } from '../../../../repositories/company-users.repository';
import { SunatRequest } from 'src/app/auth/interfaces/request/sunat.request';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { MigracionesRequest } from 'src/app/auth/interfaces/request/migraciones.request';
import { ReniecRequest } from 'src/app/auth/interfaces/request/reniec.request';
import { enumerados } from 'src/app/enums/enumerados';

@Component({
  selector: 'app-company-users-modal',
  templateUrl: './company-users-modal.component.html',
  styleUrls: [],
})
export class CompanyUsersModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() applicationId: number = 0;
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  @ViewChild('firstStep') firstStep?: RegisterCompanyUserFirstStepComponent;
  @ViewChild('secondStep') secondStep?: RegisterCompanyUserSecondStepComponent;
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;

  enumerado: enumerados = new enumerados();

  sunatResponse?: SunatResponse;
  reniecResponse?: ReniecResponse;
  migracionesResponse?: MigracionesResponse;

  registerRequest?: RegisterPersonRequest;

  constructor(
    private companyUsersRepository: CompanyUsersRepository,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.stepper = new Stepper(this.steps.nativeElement, {
      linear: true,
      animation: true,
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
      this.companyUsersRepository.sunat(request).subscribe({
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
      this.companyUsersRepository.reniec(request).subscribe({
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
      this.companyUsersRepository.migraciones(request).subscribe({
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

    this.evalRegister();
  }

  evalRegister() {
    if (!this.registerRequest) {
      console.log('evalRegister', 'registerRequest is null or undefined');
      this.spinner.hide();
      return;
    }

    this.insertCompanyUser();
  }

  insertCompanyUser() {
    console.log('registerPerson', this.registerRequest);
    //this.spinner.show();
    this.companyUsersRepository
      .insertCompanyUser(this.registerRequest!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          console.log('registerPerson-next', 'register success');

          this.hide();
          this.toastService.success('Registro realizado exitosamente', 'Éxito');
        },
        error: (err) => {
          this.spinner.hide();
          console.log('registerPerson-error', err);
          this.toastService.danger(err.error?.detail, err.error?.title);
        },
      });
  }

  hide() {
    this.onHide.emit();
  }
}
