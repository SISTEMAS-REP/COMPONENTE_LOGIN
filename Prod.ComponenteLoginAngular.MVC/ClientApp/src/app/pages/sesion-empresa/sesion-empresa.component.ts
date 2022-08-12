import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { enumerados } from 'src/app/enums/enumerados';

@Component({
  selector: 'app-sesion-empresa',
  templateUrl: './sesion-empresa.component.html',
  styleUrls: ['./sesion-empresa.component.css']
})
export class SesionEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  numero_documento : string = null;
  contrasena : string = null;
  ruc: string = null;
  id_aplicacion : number = 0;
  validadorRuc : boolean = false;
  validadorNroDocumento: boolean = false;
  validadorContrasena: boolean = false;
  validadorRucDigitos: boolean = false;

  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;


   constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _alertService: AlertService,
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
      let Data = {
        dni: this.numero_documento,
        clave: this.contrasena,
        ruc: this.ruc
      }
  
      const resp = await this.componenteLoginService.IniciarSesionExtranet(Data)
      .then(async resp => {
        if (resp.id > 0) {
          await this.fnCargarAplicacion();
          if(this.targetURL == null){
            this.spinner.hide();
            this._alertService.alertError("El usuario no tiene acceso a el aplicacion");
            return;
          }
          var frm = document.createElement('form');
          frm.id = "frmLogin";
          frm.method = 'POST';
          frm.action = `${environment.apiWebPV}/ExtranetToken/loginUnico`;
          var campo = document.createElement("input");
          campo.setAttribute("name", "Login");
          campo.setAttribute("value", this.numero_documento);
          var campo2 = document.createElement("input");
          campo2.setAttribute("name", "password");
          campo2.setAttribute("value", this.contrasena);
          var campo3 = document.createElement("input");
          campo3.setAttribute("name", "RememberMe");
          campo3.setAttribute("value", 'false');
          var campo4 = document.createElement("input");
          campo4.setAttribute("name", "Ndocumento");
          campo4.setAttribute("value", this.ruc);
          var campo5 = document.createElement("input");
          campo5.setAttribute("name", "TipoPersona");
          campo5.setAttribute("value", "2");

          var campo6 = document.createElement("input");
          campo6.setAttribute("name", "url_extranet_by_aplicacion");
          campo6.setAttribute("value", this.targetURL);
          
          frm.appendChild(campo);
          frm.appendChild(campo2);
          frm.appendChild(campo3);
          frm.appendChild(campo4);
          frm.appendChild(campo5);
          frm.appendChild(campo6);
          document.body.append(frm);
          frm.submit();
          document.getElementById('frmLogin').remove();
          this.spinner.hide();          
        }
       
        else {
          this.spinner.hide();
          this._alertService.alertError("El usuario o contraseña ingresado es invalido");
          // this._alertService.open(
          //   "warning",
          //   "Los datos ingresados son inválidos"
          // );
        }
      })
      .catch(err => []);
    }
  }

  targetURL : string = "";
  async fnCargarAplicacion (){
    const respss = await this.componenteLoginService.obtenerDatoAplicacionByUsuario({
       IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
       NroDocumento: this.ruc,
       NroDocPerNatural: this.numero_documento,
       id_aplicacion: Number(this.id_aplicacion)
    })
    .then(resp => {
      this.targetURL = resp.data;      
    })
    .catch(err => []);
  }


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

  public restrictNumeric(e) {
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



}
