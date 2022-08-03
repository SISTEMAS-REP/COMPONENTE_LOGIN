import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-recuperar-contrasena-empresa',
  templateUrl: './recuperar-contrasena-empresa.component.html',
  // styleUrls: ['./recuperar-contrasena-empresa.component.css']
})
export class RecuperarContrasenaEmpresaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private _alertService: AlertService
  ) { 
    this.form = this.fb.group({
      numeroDocumento: ['', [Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)]],
      // nroDocPerNatural: ['', [Validators.required,
      // Validators.maxLength(12)
      // ]],
    });
  }

  get numeroDocumentoField() {
    return this.form.get('numeroDocumento') as FormControl;
  }

  get numeroDocumentoErrors() {
    if (this.numeroDocumentoField.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.numeroDocumentoField.hasError('minlength')) {
      return 'La longitud mínima es de 11 caracteres.';
    }
    if (this.numeroDocumentoField.hasError('maxlength')) {
    return 'La longitud máxima es de 11 caracteres.';
    }
    return '';
  }

  // get nroDocPerNaturalField() {
  //   return this.form.get('nroDocPerNatural') as FormControl;
  // }

  // get nroDocPerNaturalErrors() {
  //   if (this.nroDocPerNaturalField.hasError('required')) {
  //     return 'Este campo es requerido';
  //   }
  //   if (this.nroDocPerNaturalField.hasError('minlength')) {
  //     return 'La longitud mínima es de 8 caracteres.';
  //   }
  //   if (this.nroDocPerNaturalField.hasError('maxlength')) {
  //     return 'La longitud máxima es de 12 caracteres.';
  //   }

  //   return '';
  // }

  ngOnInit(): void {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  fnBtnRecuperarContrasena = () => {
    if(this.form.valid){
     this._alertService.alertConfirm(
       "",
       "¿Está seguro que desea realizar esta acción?",
       () => {
     this.loginService.RecuperarContrasena({
       numeroDocumento: this.form.get('numeroDocumento').value
      //  dni: this.form.get('nroDocPerNatural').value
     })
       .then(resp => {
         this.form.get('numeroDocumento').setValue(null);
         if (resp.success) {
           this._alertService.open(
             "success",
             "Revisar su correo electrónico"
           );
         }
         else {
           this._alertService.open(
             "error",
             "Error al resetear contraseña"
           );
         }
       })
       .catch(err => []);
     });
     }
   }
 
   fnGoToPrincipal = () => {
     this.route.navigateByUrl('/principal').then(e => {
       if (e) {
         console.log("Navigation is successful!");
       } else {
         console.log("Navigation has failed!");
       }
     });
   }

}
