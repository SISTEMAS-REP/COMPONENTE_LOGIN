import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { ComunService } from '../../services/comun.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  // styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  form = new usuarioModel();
  listaSexo: Array<any>;
  listaSector: Array<any>;
  disabled = false;
  esRUC = false;
  formRegistroEmpresa: FormGroup;


  constructor(private route: Router,
    private comunService: ComunService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private _alertService: AlertService
    ) { 
      this.formRegistroEmpresa = this.fb.group({ 
        idPersona: ['', []],
        tipoPersona: ['', []],
        direccion: ['', [Validators.required]],
        tipoDocumento: ['', [Validators.required]],
        sector: ['', []],
        numeroDocumento: ['', [Validators.required]],
        nroDocPerNatural: ['', [Validators.required]],
        razonSocial: ['', []],
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
        ]],
        contrasena: ['', [Validators.required,
          Validators.minLength(8)]],
        terminos: ['', [Validators.required]]
        // dFechaSupervision: ['', [Validators.required]],
        // bRequiereVisita: ['false'],
        // vObjetoSupervision: ['', [Validators.required,
        //   Validators.maxLength(500),
        //   Validators.pattern('[a-zA-Z0-9ñÑáéíóúáéíóúÁÉÍÓÚ.° ]+|(^$)')]]
      });
    }

    get numeroDocumentoField() {
      return this.formRegistroEmpresa.get('numeroDocumento') as FormControl;
    }
  
    get numeroDocumentoErrors() {
      if (this.numeroDocumentoField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get razonSocialField() {
      return this.formRegistroEmpresa.get('razonSocial') as FormControl;
    }
  
    get razonSocialErrors() {
      if (this.razonSocialField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get direccionField() {
      return this.formRegistroEmpresa.get('direccion') as FormControl;
    }
  
    get direccionErrors() {
      if (this.direccionField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get nroDocPerNaturalField() {
      return this.formRegistroEmpresa.get('nroDocPerNatural') as FormControl;
    }
  
    get nroDocPerNaturalErrors() {
      if (this.nroDocPerNaturalField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get nombresField() {
      return this.formRegistroEmpresa.get('nombres') as FormControl;
    }
  
    get nombresErrors() {
      if (this.nombresField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get apellidosField() {
      return this.formRegistroEmpresa.get('apellidos') as FormControl;
    }
  
    get apellidosErrors() {
      if (this.apellidosField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get celularField() {
      return this.formRegistroEmpresa.get('celular') as FormControl;
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
      return this.formRegistroEmpresa.get('correo') as FormControl;
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
      return this.formRegistroEmpresa.get('contrasena') as FormControl;
    }
  
    get contrasenaErrors() {
      if (this.contrasenaField.hasError('required')) {
        return 'Este campo es requerido';
      }
      if (this.contrasenaField.hasError('minlength')) {
        return 'La longitud mínima es de 8 caracteres.';
      }
      return '';
    }

    get terminosField() {
      return this.formRegistroEmpresa.get('terminos') as FormControl;
    }
  
    get terminosErrors() {
      if (this.terminosField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

    get sectorField() {
      return this.formRegistroEmpresa.get('sector') as FormControl;
    }
  
    get sectorErrors() {
      if (this.sectorField.hasError('required')) {
        return 'Este campo es requerido';
      }
      return '';
    }

  ngOnInit(): void {
    this.fnCargaInicial();
  }
  fnCargaInicial = () => {
    this.listaSexo = [{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }];
    this.listaSector = [{ value: 1, label: 'Pesca' }, { value: 2, label: 'Industria' }, { value: 4, label: 'Otros' }];
    this.fnLimpiarDatos();
  }
  fnCargarDatosRUC = (data) => {
    // this.form.IdPersona = data.id;
    // this.form.TipoDocumento = data.idTipoIdentificacion;
    // this.form.TipoPersona = data.idTipoPersona;
    // this.form.RazonSocial = data.razonSocial;
    // this.form.Departamento = data.codigoDepartamento;
    // this.form.Provincia = data.codigoProvincia;
    // this.form.Distrito = data.codigoDistrito;
    // this.form.Direccion = data.direccion;
    this.formRegistroEmpresa.patchValue({
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
    // this.form.Nombres = data.nombres;
    // this.form.Apellidos = data.apellidos;
    // this.form.Direccion = data.direccion;
    // this.form.CorreoElectronico = data.email;
    // this.form.Celular = data.celular;
    this.formRegistroEmpresa.patchValue({
      nombres: data.nombres,
      apellidos: data.apellidos,
      celular: data.celular,
      correo: data.email,
      // direccion: data.direccion
    });
  }
  fnBtnRUCBuscar = () => {
    var ruc = this.formRegistroEmpresa.get('numeroDocumento').value;
    if(ruc.substr(0,2) != "20"){
      return this._alertService.open("warning",(`El Ruc debe comenzar con 20.`));
    }
    if(ruc.length != 11){
      return this._alertService.open("warning",(`El Ruc debe tener 11 digitos.`));
    }
    this.comunService.buscarPersonaEmpresa({
      // NroDocumento: this.form.NumeroDocumento,
      NroDocumento: this.formRegistroEmpresa.get('numeroDocumento').value,
      IdTipoIdentificacion: this.enumerado.TIPO_DE_DOCUMENTO_PERSONA.RUC
    })
      .then(resp => {
        if(resp.success){
          this.fnCargarDatosRUC(resp.data);
        }
        else{
          this.formRegistroEmpresa.patchValue({
            razonSocial: null,
            direccion: null
          });
          this._alertService.open("warning",(`El Ruc no existe`));
        }        
      })
      .catch(err => []);
  }
  fnBtnPersonaBuscar = () => {
    this.comunService.buscarPersonaEmpresa({
      // NroDocumento: this.form.NroDocPerNatural,
      NroDocumento: this.formRegistroEmpresa.get('nroDocPerNatural').value,
      IdTipoIdentificacion: this.enumerado.TIPO_DE_DOCUMENTO_PERSONA.DNI
    })
      .then(resp => {
        this.fnCargarDatosDNI(resp.data);
      })
      .catch(err => []);
  }
  fnLimpiarDatos = () => {
    this.form.IdPersona = null;
    this.form.TipoDocumento = null;
    this.form.Departamento = null;
    this.form.Provincia = null;
    this.form.Distrito = null;
    this.form.NumeroDocumento = null;
    this.form.Nombres = null;
    this.form.Apellidos = null;
    this.form.RazonSocial = null;
    this.form.Sexo = null;
    this.form.Celular = null;
    this.form.CorreoElectronico = null;
    this.form.CorreoElectronico2 = null;
    this.form.Contrasena = null;
    this.form.Contrasena2 = null;
    this.form.NroDocPerNatural = null;
  }

  fnBtnRegistrar = () => {
    this.comunService.registrarPersona({
      Id: this.form.IdPersona,
      IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
      IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
      CodigoDepartamento: this.form.Departamento.substring(0, 2),
      CodigoProvincia: this.form.Provincia.substring(2, 2),
      CodigoDistrito: this.form.Distrito.substring(4, 2),
      IdTipoIdentificacion: this.form.TipoDocumento,
      RazonSocial: this.form.RazonSocial,
      Nombres: this.form.Nombres,
      Apellidos: this.form.Apellidos,
      NroDocumento: this.form.NumeroDocumento,
      Direccion: this.form.Direccion,
      Celular: this.form.Celular,
      Email: this.form.CorreoElectronico,
      Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
      NroDocPerNatural: this.form.NroDocPerNatural,
      Contrasena: this.form.Contrasena
    }).then(resp => {
      if (resp.data.id > 0) {
        this.route.navigateByUrl('/principal').then(e => {
          if (e) {
            console.log("Navigation is successful!");
          } else {
            console.log("Navigation has failed!");
          }
        });
      }
      else {
        alert("Error en registrarse");
      }
    })
      .catch(err => []);
  }


  registrarEmpresa = () => {
    if (this.formRegistroEmpresa.valid) {   
      this._alertService.alertConfirm(
          "",
          "¿Está seguro que desea guardar esta información?",
          () => {
            this.spinner.show();
    this.comunService.registrarPersona({
      Id: this.formRegistroEmpresa.get('idPersona').value,
      // IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
      IdSector: this.formRegistroEmpresa.get('sector').value ==  "" ? 0: parseInt(this.formRegistroEmpresa.get('sector').value),
      IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
      CodigoDepartamento: this.formRegistroEmpresa.get('departamento').value,
      CodigoProvincia: this.formRegistroEmpresa.get('provincia').value,
      CodigoDistrito: this.formRegistroEmpresa.get('distrito').value,
      IdTipoIdentificacion: this.formRegistroEmpresa.get('tipoDocumento').value,
      RazonSocial: this.formRegistroEmpresa.get('razonSocial').value,
      Nombres: this.formRegistroEmpresa.get('nombres').value,
      Apellidos: this.formRegistroEmpresa.get('apellidos').value,
      NroDocumento: this.formRegistroEmpresa.get('numeroDocumento').value,
      Direccion: this.formRegistroEmpresa.get('direccion').value,
      Celular: this.formRegistroEmpresa.get('celular').value,
      Email: this.formRegistroEmpresa.get('correo').value,
      Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
      NroDocPerNatural: this.formRegistroEmpresa.get('nroDocPerNatural').value,
      Contrasena: this.formRegistroEmpresa.get('contrasena').value
    }).then(resp => {
      this.spinner.hide();
      if (resp.data.id > 0) {
        if(resp.messages.length > 0){

          this._alertService.alertWarning(resp.messages[0],
            () => {}
            );
        }
        else{
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
      }
      else {
        this._alertService.alertError("Ha ocurrido un error");
        // alert("Error en registrarse");
      }
    })
      .catch(err => {
        this._alertService.alertError("Ha ocurrido un error");
      });
    });
  }
}
}