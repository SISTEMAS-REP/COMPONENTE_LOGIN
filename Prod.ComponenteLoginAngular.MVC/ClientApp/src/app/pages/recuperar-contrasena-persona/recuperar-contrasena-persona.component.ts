import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-recuperar-contrasena-persona',
  templateUrl: './recuperar-contrasena-persona.component.html',
  // styleUrls: ['./recuperar-contrasena-persona.component.css']
})
export class RecuperarContrasenaPersonaComponent implements OnInit {

  form: FormGroup;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private _alertService: AlertService,) {
    this.form = this.fb.group({
      numeroDocumento: ['', [Validators.required]],
      correo: ['', [Validators.required,
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],
    });
  }

  get numeroDocumentoField() {
    return this.form.get('numeroDocumento') as FormControl;
  }

  get numeroDocumentoErrors() {
    if (this.numeroDocumentoField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get correoField() {
    return this.form.get('correo') as FormControl;
  }

  get correoErrors() {
    if (this.correoField.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.correoField.hasError('maxlength')) {
      return 'La longitud máxima es de 100 caracteres.';
    }
    if (this.correoField.hasError('pattern')) {
      return 'Digite un correo electrónico válido';
    }
    return '';
  }

  ngOnInit(): void {

  }

  fnBtnRecuperarContrasena = () => {
   if(this.form.valid){
    this._alertService.alertConfirm(
      "",
      "¿Está seguro que desea realizar esta acción?",
      () => {
    this.loginService.RecuperarContrasena({
      numeroDocumento: this.form.get('numeroDocumento').value,
      email: this.form.get('correo').value
    })
      .then(resp => {
        this.form.get('numeroDocumento').setValue(null);
        this.form.get('correo').setValue(null);
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

  // validarForm = () => {
  //   var hashErrors = false;
  //   var errores = {};
  //   if ((this.form.NumeroDocumento || '') == '') {
  //     errores["NumeroDocumento"] = "Debe ingresar el número de documento de identidad";
  //     hashErrors = true;
  //   }
  //   if ((this.form.CorreoElectronico || '') == '') {
  //     errores["CorreoElectronico"] = "Debe ingresar el Correo Electrónico";
  //     hashErrors = true;
  //   }
  //   if (hashErrors) {
  //     this.errors = errores;
  //     this._alertService.open(
  //       "error",
  //       "Complete y verifique todos los campos obligatorios"
  //     );
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

}

// class formModel {
//   NumeroDocumento?: string;
//   CorreoElectronico?: string;
// }

// export const DEFAULT_RECUPERAR_CONTRASENA_PERSONA = {
//   NumeroDocumento: null,
//   CorreoElectronico: null
// }
