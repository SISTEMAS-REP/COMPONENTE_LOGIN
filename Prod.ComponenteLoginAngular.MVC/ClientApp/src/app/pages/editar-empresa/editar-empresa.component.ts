import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ComunService } from '../../services/comun.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
    selector: 'app-editar-empresa',
    templateUrl: './editar-empresa.component.html',
    // styleUrls: ['./editar-perfil-empresa.component.css']
})

export class EditarEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaTupas: Array<any>;
  isAuth = false;
  formEdicionEmpresa: FormGroup;
  listaSector: Array<any>;
  listaSexo: Array<any>;

  constructor(elm: ElementRef,
    private _alertService: AlertService,
    private comunService: ComunService,
    private fb: FormBuilder,
    private route: Router
    ) {
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
    this.formEdicionEmpresa = this.fb.group({
      idPersona: ['', []],
      tipoPersona: ['', []],
      direccion: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      nroDocPerNatural: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      celular: ['', [Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('[0-9]*')]],
      correo: ['', [Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]]
    });
  }

  get numeroDocumentoField() {
    return this.formEdicionEmpresa.get('numeroDocumento') as FormControl;
  }

  get numeroDocumentoErrors() {
    if (this.numeroDocumentoField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get razonSocialField() {
    return this.formEdicionEmpresa.get('razonSocial') as FormControl;
  }

  get razonSocialErrors() {
    if (this.razonSocialField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get direccionField() {
    return this.formEdicionEmpresa.get('direccion') as FormControl;
  }

  get direccionErrors() {
    if (this.direccionField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get nroDocPerNaturalField() {
    return this.formEdicionEmpresa.get('nroDocPerNatural') as FormControl;
  }

  get nroDocPerNaturalErrors() {
    if (this.nroDocPerNaturalField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get nombresField() {
    return this.formEdicionEmpresa.get('nombres') as FormControl;
  }

  get nombresErrors() {
    if (this.nombresField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get apellidosField() {
    return this.formEdicionEmpresa.get('apellidos') as FormControl;
  }

  get apellidosErrors() {
    if (this.apellidosField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get celularField() {
    return this.formEdicionEmpresa.get('celular') as FormControl;
  }

  get celularErrors() {
    if (this.celularField.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (this.celularField.hasError('minlength')) {
        return 'La longitud mínima es de 9 caracteres.';
    }
    if (this.celularField.hasError('maxlength')) {
    return 'La longitud máxima es de 9 caracteres.';
    }
    return '';
  }

  get correoField() {
    return this.formEdicionEmpresa.get('correo') as FormControl;
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

  get contrasenaField() {
    return this.formEdicionEmpresa.get('contrasena') as FormControl;
  }

  get contrasenaErrors() {
    if (this.contrasenaField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get terminosField() {
    return this.formEdicionEmpresa.get('terminos') as FormControl;
  }

  get terminosErrors() {
    if (this.terminosField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get sectorField() {
    return this.formEdicionEmpresa.get('sector') as FormControl;
  }

  get sectorErrors() {
    if (this.sectorField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  ngOnInit(): void {
    this.fnCargaInicial();
    this.comunService.obtenerDatosUsuario()
    .then(resp => {

      this.fnCargarUsuario(resp.data);
    })
    .catch(err => []);
  }

  fnCargaInicial = () => {
    this.listaSexo = [{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }];
    this.listaSector = [{ value: 1, label: 'Pesca' }, { value: 2, label: 'Industria' }, { value: 4, label: 'Otros' }];
    // this.fnLimpiarDatos();
  }

  fnCargarUsuario = (data) => {
    this.formEdicionEmpresa.patchValue({
        idPersona: data.id,
        tipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
        tipoDocumento: data.idTipoIdentificacion,
        numeroDocumento: data.nroDocumento,
        razonSocial: data.razonSocial,
        sector: data.idSector,
        nroDocPerNatural: data.nroDocPerNatural,
        nombres: data.nombres,
        apellidos: data.apellidos,
        departamento: data.codigoDepartamento,
        provincia: data.codigoDepartamento + data.codigoProvincia,
        distrito: data.codigoDepartamento + data.codigoProvincia + data.codigoDistrito,
        celular: data.celular,
        correo: data.email,
        direccion: data.direccion
      });
}

  fnCargarDatosRUC = (data) => {
    this.formEdicionEmpresa.patchValue({
      idPersona: data.id,
      tipoDocumento: data.idTipoIdentificacion,
      tipoPersona: data.idTipoPersona,
      razonSocial: data.razonSocial,
      direccion: data.direccion,
      departamento: data.codigoDepartamento,
      provincia: data.codigoProvincia,
      distrito: data.codigoDistrito
    });
  }
  fnCargarDatosDNI = (data) => {
    this.formEdicionEmpresa.patchValue({
      nombres: data.nombres,
      apellidos: data.apellidos,
      celular: data.celular,
      correo: data.email,
      direccion: data.direccion
    });
  }
  fnBtnRUCBuscar = () => {
    this.comunService.buscarPersonaEmpresa({
      NroDocumento: this.formEdicionEmpresa.get('numeroDocumento').value,
      IdTipoIdentificacion: this.enumerado.TIPO_DE_DOCUMENTO_PERSONA.RUC
    })
      .then(resp => {
        this.fnCargarDatosRUC(resp.data);
      })
      .catch(err => []);
  }

  fnBtnPersonaBuscar = () => {
    this.comunService.buscarPersonaEmpresa({
      NroDocumento: this.formEdicionEmpresa.get('nroDocPerNatural').value,
      IdTipoIdentificacion: this.enumerado.TIPO_DE_DOCUMENTO_PERSONA.DNI
    })
      .then(resp => {
        this.fnCargarDatosDNI(resp.data);
      })
      .catch(err => []);
  }

  editarEmpresa = () =>{
    if (this.formEdicionEmpresa.valid) {
      this._alertService.alertConfirm(
          "",
          "¿Está seguro que desea guardar esta información?",
          () => {
            this.comunService.registrarPersona({
              Id: this.formEdicionEmpresa.get('idPersona').value,
              IdSector: this.formEdicionEmpresa.get('sector').value,
              IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
              CodigoDepartamento: this.formEdicionEmpresa.get('departamento').value.substr(0, 2),
              CodigoProvincia: this.formEdicionEmpresa.get('provincia').value.substr(2, 2),
              CodigoDistrito: this.formEdicionEmpresa.get('distrito').value.substr(4, 2),
              IdTipoIdentificacion: this.formEdicionEmpresa.get('tipoDocumento').value,
              RazonSocial: this.formEdicionEmpresa.get('razonSocial').value,
              Nombres: this.formEdicionEmpresa.get('nombres').value,
              Apellidos: this.formEdicionEmpresa.get('apellidos').value,
              NroDocumento: this.formEdicionEmpresa.get('numeroDocumento').value,
              Direccion: this.formEdicionEmpresa.get('direccion').value,
              Celular: this.formEdicionEmpresa.get('celular').value,
              Email: this.formEdicionEmpresa.get('correo').value,
              Flag: this.enumerado.TIPO_ACCION.EDITAR,
              NroDocPerNatural: this.formEdicionEmpresa.get('nroDocPerNatural').value
              // Contrasena: this.formEdicionEmpresa.get('contrasena').value
            }).then(resp => {
              if (resp.data.id > 0) {
                this._alertService.alertOk(
                  "Registro exitoso",
                  '',
                  () => {
                      this.route.navigateByUrl('/principal').then(e => {
                          if (e) {
                              console.log("Navigation is successful!");
                          } else {
                              console.log("Navigation has failed!");
                          }
                      });
                  }
                );
              }
              else {
                this._alertService.alertError("Ha ocurrido un error");
              }
            })
              .catch(err => {
                this._alertService.alertError("Ha ocurrido un error");
              });
          });
        }
  }

}
