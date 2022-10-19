import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangePasswordRequest } from '../../interfaces/request/change-password.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { ChangePasswordRepository } from '../../repositories/change-password.repository';
import { enumerados } from 'src/app/enums/enumerados';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ChangePasswordPersonFormComponent } from './components/change-password-person-form/change-password-person-form.component';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-change-password-person',
  templateUrl: './change-password-person.component.html'
})
export class ChangePasswordPersonComponent implements OnInit {
  @ViewChild('changePasswordPersonForm') changePasswordPersonForm?: ChangePasswordPersonFormComponent;
  applicationId: number = 0;
  returnUrl?: string;
  UserName: string = "";
  identificador: string = "";
  logo?: SafeUrl;
  ChangePasswordRequest?: ChangePasswordRequest;
  recaptchaToken?: string;
  enums = new enumerados();

  isVisibleForm : boolean = false;
  validaSuccess : boolean = false;
  Verificador: boolean = false;
  VerificaIdentificador : boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ChangePasswordRepository: ChangePasswordRepository,
    private sanitizer: DomSanitizer,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.returnUrl = params['returnUrl'];
      this.UserName = params['UserName'] || null;
      this.identificador = params['identificador'] || null;
      this.loadLogo();
      this.VerifyIdentifier(); 
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

    this.ChangePasswordRequest.personType = this.enums.TIPO_PERSONA.NATURAL;
    this.ChangePasswordRequest.applicationId = this.applicationId;
    this.ChangePasswordRequest.UserName = this.UserName;
    this.ChangePasswordRequest.identificador = this.identificador;
    this.ChangePasswordRequest.returnUrl = this.returnUrl;
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
    if (!this.ChangePasswordRequest) {
      console.log('evalChangePassword', 'ChangePasswordRequest is null or undefined');
      return;
    }

    if (!this.recaptchaToken) {
      console.log('evalChangePassword', 'recaptchaToken is null or undefined');
      return;
    }

    this.changePasswordPerson();
  }


  VerifyIdentifier(){
    let request: ChangePasswordRequest = {
      identificador: this.identificador,
      applicationId: this.applicationId,
      password: ''
    };

    this.ChangePasswordRepository
      .VerifyIdentifier(request)
      .subscribe({
        next: (data : any) => {
          this.Verificador = data.succeeded;
          if(this.Verificador){       
            this.isVisibleForm = true;
            this.VerificaIdentificador = false;
          }   
          else {
            this.isVisibleForm = false;
            this.VerificaIdentificador = true;
          }      
        },
        error: (err) => {
        
        },
      });
  }

  changePasswordPerson() {
    this.ChangePasswordRepository
      .changePasswordPerson(this.ChangePasswordRequest!, this.recaptchaToken!)
      .subscribe({
        next: (dato : any) => {
          this.spinner.hide();
          if(this.Verificador){
            console.log('changePasswordPerson-next', 'ChangePassword success');
            this.isVisibleForm = false;
            this.validaSuccess = true;
          }
          //this.refresh();
         // this.toastService.success('ChangePassword success');

        },
        error: (err) => {
          this.spinner.hide()
          console.log('changePasswordPerson-error', err);

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
    this.changePasswordPersonForm?.resetFormFields();
  }

  refresh() {
    this.refreshRecaptchaToken();
    this.refreshChangePasswordForm();
  }


  sendCancel() {
    if (this.returnUrl) {
      window.location.href = this.returnUrl;
    } else {
      this.router.navigate(['presentation']);
    }
  }

}

