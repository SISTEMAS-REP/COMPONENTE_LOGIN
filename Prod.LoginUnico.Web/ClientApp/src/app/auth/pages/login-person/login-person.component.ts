import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import Stepper from 'bs-stepper';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RegisterRequest } from '../../interfaces/request/register.request';
import { LoginRepository } from '../../repositories/login.repository';
import { LoginRequest } from '../../interfaces/request/login.request';

@Component({
  selector: 'app-login-person',
  templateUrl: './login-person.component.html',
  styleUrls: ['./login-person.component.css']
})
export class LoginPersonComponent implements OnInit {
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;
  enumerado: enumerados = new enumerados();
  numero_documento : string = "";
  contrasena : string = "";
  validadorNroDocumento: boolean = false;
  validadorNroDocumentoDigitos: boolean = false;
  validadorContrasena: boolean = false;
  id_aplicacion : number = 0;
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl | undefined;

  loginRequest?: LoginRequest;
  recaptchaToken?: string;
  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private route: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private loginRepository: LoginRepository,
  ) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id_aplicacion = params['id_aplicacion'] || null;
      this.obtenerImagenByAplicacion();
    });
  }

  obtenerImagenByAplicacion = () =>{
    let Data = {
      id_aplicacion: Number(this.id_aplicacion) 
    }

    this.componenteLoginService.obtenerImagenByAplicacion(Data)
      .then((resp: { data: string; }) => {
        var binary = atob(resp.data.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var e = 0; e < len; e++) {
          view[e] = binary.charCodeAt(e);
        }
        var blob = new Blob([view], { type: this.contentType });
        var urlArchivo = URL.createObjectURL(blob);
        this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
      })
      .catch(() => []);
  }

  guardar = () =>{
    this.setReCAPTCHA()
  }

  async iniciarSesionPersonaNatural(){
    if(this.id_aplicacion == null){
      return;
    }
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validadorNroDocumento && !this.validadorNroDocumentoDigitos && !this.validadorContrasena){
      this.spinner.show();
      var data = 
      {
        PersonType:  this.enumerado.TIPO_PERSONA.NATURAL,  
        RucNumber: "", 
        DocumentNumber: this.numero_documento, 
        Password: this.contrasena, 
        RememberMe: false, 
        ReturnUrl: "" ,
        applicationId : this.id_aplicacion
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

    }
  
  }
  changeNroDocumento = () =>{
    if(this.numero_documento == null || this.numero_documento == ""){
      this.validadorNroDocumento = true;
    }
    else{
      if( this.numero_documento.length < 8){    
        this.validadorNroDocumentoDigitos = true;
        this.validadorNroDocumento = false;
      }
      else {
        this.validadorNroDocumentoDigitos = false;
        this.validadorNroDocumento = false;
      }    
    }
  }

  changeContrasena = () =>{
    if(this.contrasena == null || this.contrasena == ""){
      this.validadorContrasena = true;
    }
    else{
      this.validadorContrasena = false;
    }
  }

  mostrarContrasena(){
    let contrasena :any = document.getElementById('contrasena');
    let eyeContrasena :any = document.getElementById('eyeContrasena');
    
    if(contrasena.type == "password"){
      contrasena.type = "text";
      eyeContrasena.style.opacity=0.8;
    }
    else{
      contrasena.type = "password";
      eyeContrasena.style.opacity=0.4;
    }
  }


  public restrictNumeric(e: { metaKey: any; ctrlKey: any; which: number; }) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which === 46) {
      return true;
     }
    if (e.which < 33) {
      return true;
    }
    if (e.which === 188){
        return true;
      }
     

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }

   CancelarSesion = () =>{
    this.componenteLoginService.ObtenerUrlsVolver({
      TipoBtn : 1
    })
      .then((resp: { data: string; }) => {
      window.location.href  = resp.data;      
      })

      .catch((err: any) => []);
   }


   createNotification = (type: string, title: string, message: string): void => {
    this.notification.create(
      type,
      title,
      message
    );
  };
  refreshRecaptchaToken() {
    this.recaptchaToken = undefined;
    console.log('refreshRecaptchaToken', 'crecaptchaToken cleared');
  }

  refresh() {
    this.refreshRecaptchaToken();
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

  evalLogin() {
    debugger
    if (!this.recaptchaToken) {
      console.log('evalRegister', 'recaptchaToken is null or undefined');
      return;
    }
    this.iniciarSesionPersonaNatural();
  }
}
