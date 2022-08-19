import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { enumerados } from 'src/app/enums/enumerados';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-recuperar-contrasena-persona',
  templateUrl: './recuperar-contrasena-persona.component.html',
  styleUrls: ['./recuperar-contrasena-persona.component.css']
})
export class RecuperarContrasenaPersonaComponent implements OnInit {
  id_aplicacion : number = 0;
  numeroDocumento: string = null;
  email: string = null;
  validarNroDocumento: boolean = false;
  validarEmail: boolean = false;
  validaSuccess: boolean = false;
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;


  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _alertService: AlertService,
    private route: Router
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


  fnBtnRecuperarContrasena = () => {
    this.changeNroDocumento();
    this.changeEmail();

     if(!this.validarNroDocumento && !this.validarEmail){
      this._alertService.alertConfirm(
       "",
       "¿Está seguro que desea realizar esta acción?",
       () => {
      this.spinner.show();
      let Data = {
        numeroDocumento: this.numeroDocumento,
        email: this.email
       }
       this.componenteLoginService.RecuperarContrasena(Data)
        .then(resp => {
         this.spinner.hide();
         this.numeroDocumento = null
         this.email = null
         if (resp.success) {
           this.validaSuccess = true;
         }
         else {
           this._alertService.alertError("Error al recuperar contraseña");
         }
       })
       .catch(err => []);
     });
     }
   }
  


   changeNroDocumento = () =>{
    if(this.numeroDocumento == null || this.numeroDocumento == ""){
      this.validarNroDocumento = true;
    }
    else{
      this.validarNroDocumento = false;
    }
  }

  changeEmail = () =>{
    if(this.email == null || this.email == ""){
      this.validarEmail = true;
    }
    else{
      this.validarEmail = false;
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

   CancelarSesion = () =>{
    this.componenteLoginService.ObtenerUrlsVolver({
      TipoBtn : 1
    })
      .then(resp => {
      window.location.href  = resp.data;      
      })

      .catch(err => []);
   }
   
}
