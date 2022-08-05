import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { ActivatedRoute } from '@angular/router';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';


@Component({
  selector: 'app-recuperar-contrasena-persona',
  templateUrl: './recuperar-contrasena-persona.component.html',
  styleUrls: ['./recuperar-contrasena-persona.component.css']
})
export class RecuperarContrasenaPersonaComponent implements OnInit {
  numeroDocumento: string = null;
  email: string = null;

  validarNroDocumento: boolean = false;
  validarEmail: boolean = false;

  validaSuccess: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private componenteLoginService: ComponenteLoginService,
    private _alertService: AlertService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }


  fnBtnRecuperarContrasena = () => {
    debugger;
    this.changeNroDocumento();
    this.changeEmail();

     if(!this.validarNroDocumento && !this.validarEmail){
      this._alertService.alertConfirm(
       "",
       "¿Está seguro que desea realizar esta acción?",
       () => {
      this.componenteLoginService.RecuperarContrasena({
      numeroDocumento: this.numeroDocumento,
      email: this.email
     })
       .then(resp => {
        debugger;
         this.spinner.hide();
         this.numeroDocumento = null
         this.email = null
         if (resp.success) {
          //  this._alertService.open(
          //    "success",
          //    "Revisar su correo electrónico"
          //  );
           this.validaSuccess = true;
         }
         else {
           this._alertService.alertError("Error al resetear contraseña");
         }
       })
       .catch(err => []);
        this._alertService.alertError("Ha ocurrido un error");
        this.spinner.hide();
     });
     }
   }
  

  // fnBtnRecuperarContrasena2 = () => {
  //   this.changeNroDocumento();
  //   this.changeEmail();

  //   if(!this.validarNroDocumento && !this.validarEmail){
  //     this.spinner.show();
  //     let Data = {
  //       numeroDocumento: this.numeroDocumento,
  //       email: this.email
  //     }
  //     const formData = {...Data};
  //   //   this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
  //   //     this.spinner.hide();
  //   //     this.validaSuccess = true;
  //   //   }, error => console.error(error));
    
  //    }   
  //  }


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

}
