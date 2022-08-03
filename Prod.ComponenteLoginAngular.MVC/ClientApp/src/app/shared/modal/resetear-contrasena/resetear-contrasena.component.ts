import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-resetear-contrasena',
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.css']
})
export class ModalResetearContrasenaComponent implements OnInit {
  form: FormGroup;
  id: string;
  userName: string;
  email: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _alertService: AlertService,
    private loginService: LoginService) {
    this.form = this.fb.group({
      contrasena: ['', [Validators.required,
      Validators.maxLength(100)
      ]],
      contrasenaRepetida: ['', [Validators.required,
      Validators.maxLength(100)
      ]],
    });
    this.id = data.id;
    this.userName = data.userName;
    this.email = data.email;
  }

  get contrasenaField() {
    return this.form.get('contrasena') as FormControl;
  }

  get contrasenaErrors() {
    if (this.contrasenaField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get contrasenaRepetidaField() {
    return this.form.get('contrasenaRepetida') as FormControl;
  }

  get contrasenaRepetidaErrors() {
    if (this.contrasenaRepetidaField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  ngOnInit(): void {
    // this.lastPage = 1;
    // this.fnListarDocumentosAdjuntos();
  }

  fnBtnCambiarContrasena = () => {
    if(this.form.get('contrasena').value == this.form.get('contrasenaRepetida').value){
      this.loginService.CambiarContrasena({
        id: this.id,
        dni: this.userName,
        email: this.email,
        clave: this.form.get('contrasena').value,
      })
        .then(resp => {
          if (resp.success) {
            this._alertService.open(
              "success",
              "Se actualizó la contraseña"
            );
          }
          else {
            this._alertService.open(
              "warning",
              "Ocurrió un error al actualizar la contraseña"
            );
          }
        })
        .catch(err => []);
    }
    else{
      this._alertService.open(
        "warning",
        "Las contraseñas no inciden"
      );
    }
  }

  // fnListarDocumentosAdjuntos = () => {
  //   this.page = 1;
  //   this.pageSize = 5;
  //   this.listaFlujos = [];
  //   this.solicitudService.detalleFlujoDocumentarioListar({
  //     IdDocumento: this.idDocumento,
  //     Page: this.page,
  //     PageSize: this.pageSize
  //   })
  //     .then(resp => {
  //       this.listaFlujos = resp.data;
  //       this.lastPage = 1;
  //       if (this.listaFlujos.length > 0) {
  //         this.fnPaginar();
  //       }
  //     })
  //     .catch(err => []);
  // }
}
