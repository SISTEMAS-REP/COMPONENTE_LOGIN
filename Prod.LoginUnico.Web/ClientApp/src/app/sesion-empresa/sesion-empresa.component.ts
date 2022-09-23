import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { environment } from 'src/environments/environment';
import { enumerados } from 'src/app/enums/enumerados';
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: 'app-sesion-empresa',
  templateUrl: './sesion-empresa.component.html',
  styleUrls: ['./sesion-empresa.component.css']
})
export class SesionEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  numero_documento : string = "";
  contrasena : string = "";
  ruc: string = "";
  id_aplicacion : number = 0;
  validadorRuc : boolean = false;
  validadorNroDocumento: boolean = false;
  validadorContrasena: boolean = false;
  validadorRucDigitos: boolean = false;

  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl | undefined;


   constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private notification: NzNotificationService,
    private modalService: NzModalService
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
      .then(resp => {
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
      .catch(err => []);
  }

  async iniciarSesionPersonaJuridica(){
    if(this.id_aplicacion == null){
      return;
    }
    this.changeRuc();
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validadorRuc && !this.validadorNroDocumento && !this.validadorContrasena){
      this.spinner.show();
      const resp = await this.componenteLoginService.Auth(
        { 
          PersonType: this.enumerado.TIPO_PERSONA.JURIDICA, 
          RucNumber:  this.ruc, 
          DocumentNumber: this.numero_documento, 
          Password: this.contrasena, 
          RememberMe: false, 
          ReturnUrl: "" ,
          applicationId : this.id_aplicacion })
      .then((resp) => {
        this.spinner.hide();
        let tipo_mensaje = resp.succeeded ? 'success': 'error';
        let elementos = '';
        resp.errors.forEach((elemento: any) => {
          elementos = elementos + `<li>${ elemento }</li>`;
        });
        this.createNotification(tipo_mensaje, 'Inicio de Sesión', `<ul>${ elementos }</ul>`);
        if(resp.succeeded){
          // window.location.href = resp.data.returnUrl;
        }
        this.spinner.hide();
      })
      .catch((err: any) => {
      });
    }
  
  }


  // targetURL : string = "";
  // async fnCargarAplicacion (){
  //   const respss = await this.componenteLoginService.obtenerDatoAplicacionByUsuario({
  //      IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
  //      NroDocumento: this.ruc,
  //      NroDocPerNatural: this.numero_documento,
  //      id_aplicacion: Number(this.id_aplicacion)
  //   })
  //   .then(resp => {
  //     this.targetURL = resp.data;      
  //   })
  //   .catch(err => []);
  // }


  changeRuc = () =>{
    if(this.ruc == null || this.ruc == ""){
      this.validadorRuc = true;
    }
    else{
      if( this.ruc.length < 11){    
        this.validadorRucDigitos = true;
        this.validadorRuc = false;
      }
      else {
        this.validadorRucDigitos = false;
        this.validadorRuc = false;
      }    
    }
  }
  
  changeNroDocumento = () =>{
    if(this.numero_documento == null || this.numero_documento == ""){
      this.validadorNroDocumento = true;
    }
    else{
      this.validadorNroDocumento = false;
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
      .then(resp => {
      window.location.href  = resp.data;      
      })

      .catch(err => []);
   }

   createNotification = (type: string, title: string, message: string): void => {
    this.notification.create(
      type,
      title,
      message
    );
  };

}
