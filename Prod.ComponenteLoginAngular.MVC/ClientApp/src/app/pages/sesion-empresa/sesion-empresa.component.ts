import { Component, OnInit } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sesion-empresa',
  templateUrl: './sesion-empresa.component.html',
  // styleUrls: ['./sesion-empresa.component.css']
})
export class SesionEmpresaComponent implements OnInit {
  form = new formModel();
  errors: any;
  constructor(private loginService: LoginService,
    private _alertService: AlertService,
    private spinner: NgxSpinnerService,
    private route: Router) {
    this.errors = { ...DEFAULT_SESION_EMPRESA };
  }

  ngOnInit(): void {

  }

  fnBtnIngresar = () => {
    this.errors = { ...DEFAULT_SESION_EMPRESA };
    if (this.validarForm()) {
      this.spinner.show();
      this.loginService.IniciarSesionExtranet({
        ruc: this.form.NumeroDocumento,
        dni: this.form.NroDocPerNatural,
        clave: this.form.Contrasena
      })
        .then(resp => {
          if (resp.id > 0) {
            var frm = document.createElement('form');
            frm.id = "frmLogin";
            frm.method = 'POST';
            frm.action = `${environment.apiWebPV}/ExtranetToken/login`;
            var campo = document.createElement("input");
            campo.setAttribute("name", "Login");
            campo.setAttribute("value", this.form.NroDocPerNatural);
            var campo2 = document.createElement("input");
            campo2.setAttribute("name", "password");
            campo2.setAttribute("value", this.form.Contrasena);
            var campo3 = document.createElement("input");
            campo3.setAttribute("name", "RememberMe");
            campo3.setAttribute("value", 'false');
            var campo4 = document.createElement("input");
            campo4.setAttribute("name", "Ndocumento");
            campo4.setAttribute("value", this.form.NumeroDocumento);
            var campo5 = document.createElement("input");
            campo5.setAttribute("name", "TipoPersona");
            campo5.setAttribute("value", "2");
            frm.appendChild(campo);
            frm.appendChild(campo2);
            frm.appendChild(campo3);
            frm.appendChild(campo4);
            frm.appendChild(campo5);
            document.body.append(frm);
            frm.submit();
            document.getElementById('frmLogin').remove();
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
            this._alertService.open(
              "error",
              "Los datos ingresados son inválidos"
            );
          }
        })
        .catch(err => []);
    }
  }

  validarForm = () => {
    var hashErrors = false;
    var errores = {};
    if ((this.form.NumeroDocumento || '') == '') {
      errores["NumeroDocumento"] = "Debe ingresar el número de ruc";
      hashErrors = true;
    }

    if ((this.form.NroDocPerNatural || '') == '') {
      errores["NroDocPerNatural"] = "Debe ingresar el número de documento de identidad";
      hashErrors = true;
    }

    if ((this.form.Contrasena || '') == '') {
      errores["Contrasena"] = "Debe ingresar la contraseña";
      hashErrors = true;
    }

    if (hashErrors) {
      this.errors = errores;
      this._alertService.open(
          "warning",
          "Complete y verifique todos los campos obligatorios"
      );

      return false;
    } else {
      return true;
    }
  };
}

class formModel {
  NumeroDocumento?: string;
  NroDocPerNatural?: string;
  Contrasena?: string;
}

export const DEFAULT_SESION_EMPRESA = {
  NumeroDocumento: null,
  NroDocPerNatural: null,
  Contrasena: null
}
