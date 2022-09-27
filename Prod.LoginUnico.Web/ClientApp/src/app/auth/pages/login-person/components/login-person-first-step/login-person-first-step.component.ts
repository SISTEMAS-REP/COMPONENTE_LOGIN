import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRepository } from '../../../../repositories/login.repository';
import { LoginRequest } from '../../../../interfaces/request/login.request';
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { enumerados } from 'src/app/enums/enumerados';
import { ActivatedRoute } from '@angular/router';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';


@Component({
  selector: 'app-login-person-first-step',
  templateUrl: './login-person-first-step.component.html'
})
export class LoginPersonFirstStepComponent implements OnInit {

  @Output() onSendDocumentNumber: EventEmitter<string> = new EventEmitter();
  applicationId: number = 0;
  documentNumberLength: number = 12;
  hidePassword: boolean = true;
  enumerado: enumerados = new enumerados();
  myForm: FormGroup = this.fb.group({

    documentNumber: [
      null,
      { validators: [Validators.required] },
    ],
    password: [
      null,
      { validators: [Validators.required] },
    ],
  
  });

  recaptchaToken?: string;
  loginRequest?: LoginRequest;
  documentNumber : string = "";
  password : string = "";

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private spinner: NgxSpinnerService,
    private loginRepository: LoginRepository,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: ActivatedRoute,
    private componenteLoginService: ComponenteLoginService,
  ) { 

  }

  ngOnInit(): void {
    this.myForm
    .get('documentNumber')
    ?.valueChanges.subscribe((documentNumber) => {
      if (this.myForm.get('documentNumber')?.valid) {
        //console.log('documentNumber', documentNumber);
        this.onSendDocumentNumber.emit(documentNumber);
      }
    });

    this.router.queryParams.subscribe(params => {
      this.applicationId = params['applicationId'] || null;
    });
  }

  resetFormFields() {
    this.myForm.reset({
      documentNumber: null,
      password: null,
    });
  }

  resetDocumentNumberField() {
    this.myForm.get('documentNumber')?.reset(null);
    this.myForm
      .get('documentNumber')
      ?.setValidators([
        Validators.required,
        Validators.minLength(this.documentNumberLength),
        Validators.maxLength(this.documentNumberLength),
      ]);
    this.myForm.get('documentNumber')?.updateValueAndValidity();

  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  guardar = () =>{
    debugger;
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    else {
      this.setReCAPTCHA() 
    }

  }

  setReCAPTCHA() {
    this.refreshRecaptchaToken();

    this.spinner.show();
    this.recaptchaV3Service.execute('registerSubmit').subscribe({
      next: (token) => {
        console.log('setReCAPTCHA-next', token);
        this.recaptchaToken = token;
        this.evalLogin();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('setReCAPTCHA-error', err);
      },
    });
  }

  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refresh() {
    this.refreshRecaptchaToken();
  }


  evalLogin() {
    debugger
    if (!this.recaptchaToken) {
      console.log('evalRegister', 'recaptchaToken is null or undefined');
      return;
    }
    this.iniciarSesionPersonaNatural();
  }

  
  async iniciarSesionPersonaNatural(){
    debugger;
    if(this.applicationId == null){
      return;
    }
   // this.changeNroDocumento();
   // this.changeContrasena();

   // if(!this.validadorNroDocumento && !this.validadorNroDocumentoDigitos && !this.validadorContrasena){
      this.spinner.show();
      var data = 
      {
        PersonType:  this.enumerado.TIPO_PERSONA.NATURAL,  
        RucNumber: "", 
        DocumentNumber: this.documentNumber, 
        Password: this.password, 
        RememberMe: false, 
        ReturnUrl: "" ,
        applicationId : this.applicationId
      };

      this.loginRequest = {
        ...this.loginRequest,
        ...data,
      };
      debugger
    
      this.loginRepository
      .loginPerson(this.loginRequest!, this.recaptchaToken!)
      .subscribe({
        next: (resp : any) => {
          debugger
          this.spinner.hide();
          console.log('loginPerson-next', 'login success');
          let tipo_mensaje = resp.succeeded ? 'success': 'error';
          let elementos = '';
          resp.errors.forEach((elemento: any) => {
            elementos = elementos + `<li>${ elemento }</li>`;
          });
          this.createNotification(tipo_mensaje, 'Inicio de Sesión', `<ul>${ elementos }</ul>`);
          if(resp.succeeded){
            // window.location.href = resp.data.returnUrl;
          }
          this.refresh();
        },
        error: (err) => {
          this.spinner.hide();
          console.log('loginPerson-error', err);
        },
      });

   // }
  
  }

  createNotification = (type: string, title: string, message: string): void => {
    this.notification.create(
      type,
      title,
      message
    );
  };

}



