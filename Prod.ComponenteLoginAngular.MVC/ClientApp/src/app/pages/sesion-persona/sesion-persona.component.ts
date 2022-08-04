import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sesion-persona',
  templateUrl: './sesion-persona.component.html',
  styleUrls: ['./sesion-persona.component.css']
})
export class SesionPersonaComponent implements OnInit {

  numero_documento : string = null;
  contrasena : string = null;

  validadorNroDocumento: boolean = false;
  validadorContrasena: boolean = false;
  id_aplicacion : number = 0;

  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id_aplicacion = params['id_aplicacion'] || null;
      this.obtenerImagenByAplicacion();
    });
  }

  obtenerImagenByAplicacion = () =>{
    debugger
    let Data = {
      id_aplicacion: Number(this.id_aplicacion) 
    }

    this.componenteLoginService.obtenerImagenByAplicacion(Data)
      .then(resp => {
        debugger
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

  iniciarSesionPersonaNatural = () =>{
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validadorNroDocumento && !this.validadorContrasena){
      this.spinner.show();
      let Data = {
        dni: this.numero_documento,
        clave: this.contrasena
      }
      this.componenteLoginService.IniciarSesionExtranet(Data)
      .then(resp => {
        this.spinner.hide();
        debugger
        if (resp.id > 0) {
          debugger
          var frm = document.createElement('form');
          frm.id = "frmLogin";
          frm.method = 'POST';
          frm.action = `${environment.apiWebPV}/ExtranetToken/login`;
          var campo = document.createElement("input");
          campo.setAttribute("name", "Login");
          campo.setAttribute("value", this.numero_documento);
          var campo2 = document.createElement("input");
          campo2.setAttribute("name", "password");
          campo2.setAttribute("value", this.contrasena);
          var campo3 = document.createElement("input");
          campo3.setAttribute("name", "RememberMe");
          campo3.setAttribute("value", 'false');
          var campo5 = document.createElement("input");
          campo5.setAttribute("name", "TipoPersona");
          campo5.setAttribute("value", "1");
          frm.appendChild(campo);
          frm.appendChild(campo2);
          frm.appendChild(campo3);
          frm.appendChild(campo5);
          document.body.append(frm);
          frm.submit();
          document.getElementById('frmLogin').remove();
          debugger
          this.fnCargarAplicacion();
          debugger
        }
       
      })
      .catch(err => []);
    }
   
  }

  fnCargarAplicacion = () =>{
    debugger
    this.componenteLoginService.obtenerDatoAplicacionByUsuario({
       IdTipoPersona: 1,
       NroDocumento: this.numero_documento,
       NroDocPerNatural: this.numero_documento,
       id_aplicacion: Number(this.id_aplicacion)
    })
    .then(resp => {
      debugger
      let targetURL = resp.data;
      let newURL = document.createElement('a');
      newURL.href = targetURL;
      document.body.appendChild(newURL);
      newURL.click();
    })
    .catch(err => []);
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
