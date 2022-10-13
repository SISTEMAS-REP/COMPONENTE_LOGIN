import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyUser } from '../../interfaces/company-user';
import { SelectionType, TableColumn } from '@siemens/ngx-datatable';
import { HeaderButton } from 'src/app/shared/interfaces/header-button';
import { CompanyUsersRepository } from '../../repositories/company-users.repository';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { EnabledDisabledPipe } from '../../../pipes/enabled-disabled.pipe';
import { CompanyUserRequest } from '../../interfaces/request/company-user.request';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: [],
})
export class CompanyUsersComponent implements OnInit {
  @ViewChild('registerUserModal') modalConceptos: any;
  defaultModal: BsModalRef = new BsModalRef();

  applicationId: number = 0;
  returnUrl?: string;

  modalParams = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  companyUsers: CompanyUser[] = [];

  columns: TableColumn[] = [
    { name: 'Nro. Documento', prop: 'documentNumber', width: 50 },
    { name: 'Apellidos', prop: 'lastName', width: 50 },
    { name: 'Nombres', prop: 'firstName', width: 50 },
    { name: 'Teléfono', prop: 'phoneNumber', width: 50 },
    { name: 'Correo', prop: 'email', width: 50 },
    {
      name: 'Estado',
      prop: 'status',
      width: 50,
      pipe: new EnabledDisabledPipe(),
    },
  ];

  buttons: HeaderButton[] = [
    {
      name: 'AGREGAR USUARIO',
      class: 'darker',
    },
  ];

  companyUserSelected?: CompanyUser;

  selectionType = SelectionType.single;

  companyUserRequest?: CompanyUserRequest;

  constructor(
    private companyUsersRepository: CompanyUsersRepository,
    private activatedRoute: ActivatedRoute,
    //private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private modalService: BsModalService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('queryParams', params);
      this.applicationId = params['applicationId'] || 0;
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnInit(): void {
    this.findCompanyUsers();
  }

  refresh() {
    this.companyUserSelected = undefined;
    this.companyUsers = [];
    this.refreshCompanyUser();
  }

  refreshCompanyUser() {
    this.companyUserSelected = undefined;
    this.companyUserRequest = undefined;
  }

  findCompanyUsers() {
    this.spinner.show();
    this.companyUsersRepository.findCompanyUsers().subscribe({
      next: (data: CompanyUser[]) => {
        this.spinner.hide();
        this.refresh();
        this.companyUsers = data;
      },
      error: (err) => {
        this.spinner.hide();
        this.refresh();
        console.log('findCompanyUsers-error', err);

        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }

  selectUser($event: any) {
    console.log('selectUser', $event);
    this.companyUserSelected = $event.data as CompanyUser;
  }

  saveForm($event: CompanyUserRequest) {
    this.companyUserRequest = $event;
    this.evalUpdate();
  }

  evalUpdate() {
    if (!this.companyUserRequest) {
      console.log('evalUpdate', 'companyUserRequest is null or undefined');
    }

    this.updateCompanyUser();
  }

  updateCompanyUser() {
    this.spinner.show();
    this.companyUsersRepository
      .updateCompanyUser(this.companyUserRequest!)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastService.success(
            'Usuario actualizado exitosamente',
            'Éxito'
          );

          this.companyUserRequest = undefined;
          this.findCompanyUsers();
        },
        error: (err) => {
          this.spinner.hide();
          console.log('updateCompanyUser-error', err);

          this.toastService.danger(err.error.detail, err.error.title);
        },
      });
  }

  showModal() {
    this.defaultModal = this.modalService.show(
      this.modalConceptos,
      this.modalParams
    );
  }

  closeModal() {
    this.defaultModal.hide();
  }
}
