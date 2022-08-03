import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { ComunService } from '../../services/comun.service';
import { UbigeoService } from '../../services/ubigeo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

let listaDepartamentosTemp = null;
let listaProvinciasTemp = null;
let listaDistritosTemp = null;

@Component({
    selector: 'app-editar-persona',
    templateUrl: './editar-persona.component.html',
    // styleUrls: ['./editar-persona.component.css']
})

export class EditarPersonaComponent implements OnInit {

    enumerado: enumerados = new enumerados();
    form = new usuarioModel();
    listaTipoDocumento: Array<any>;
    listaRubro: Array<any>;
    listaDepartamentos: Array<any>;
    listaProvincias: Array<any>;
    listaDistritos: Array<any>;
    listaSexo: Array<any>;
    disabled = false;
    noEsRUC = true;
    esRUC = false;
    departamentoSeleccionado: string;
    provinciaSeleccionado: string;
    distritoSeleccionado: string;
    formEdicionPersona: FormGroup;
    longitudDocumento = 0;
    isAuth = false;

    constructor(private route: Router,
        private comunService: ComunService,
        private ubigeoService: UbigeoService,
        private fb: FormBuilder,
        private _alertService: AlertService
        ){
          if (localStorage.getItem('AppVusp')) {
            this.isAuth = true;
          }
            this.formEdicionPersona = this.fb.group({
                idPersona: ['', []],
                tipoPersona: ['', []],
                direccion: ['', []],
                tipoDocumento: ['', [Validators.required]],
                numeroDocumento: ['', [Validators.required]],
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
                ]]
              });
              this.formEdicionPersona.get('departamento').valueChanges.subscribe(valor => { this.departamentoSeleccionado = valor; this.fnCargaProvincias(valor) }); // Subscribimos a los cambios
              this.formEdicionPersona.get('provincia').valueChanges.subscribe(valor => { this.provinciaSeleccionado = valor; this.fnCargaDistritos(valor) }); // Subscribimos a los cambios
        }

        get tipoDocumentoField() {
            return this.formEdicionPersona.get('tipoDocumento') as FormControl;
          }

          get tipoDocumentoErrors() {
            if (this.tipoDocumentoField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get numeroDocumentoField() {
            return this.formEdicionPersona.get('numeroDocumento') as FormControl;
          }

          get numeroDocumentoErrors() {
            if (this.numeroDocumentoField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get razonSocialField() {
            return this.formEdicionPersona.get('razonSocial') as FormControl;
          }

          get razonSocialErrors() {
            if (this.razonSocialField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get nombresField() {
            return this.formEdicionPersona.get('nombres') as FormControl;
          }

          get nombresErrors() {
            if (this.nombresField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get apellidosField() {
            return this.formEdicionPersona.get('apellidos') as FormControl;
          }

          get apellidosErrors() {
            if (this.apellidosField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get departamentoField() {
            return this.formEdicionPersona.get('departamento') as FormControl;
          }

          get departamentoErrors() {
            if (this.departamentoField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get provinciaField() {
            return this.formEdicionPersona.get('provincia') as FormControl;
          }

          get provinciaErrors() {
            if (this.provinciaField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get distritoField() {
            return this.formEdicionPersona.get('distrito') as FormControl;
          }

          get distritoErrors() {
            if (this.distritoField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get celularField() {
            return this.formEdicionPersona.get('celular') as FormControl;
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
            return this.formEdicionPersona.get('correo') as FormControl;
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
            return this.formEdicionPersona.get('contrasena') as FormControl;
          }

          get contrasenaErrors() {
            if (this.contrasenaField.hasError('required')) {
              return 'Este campo es requerido';
            }
            return '';
          }

          get terminosField() {
            return this.formEdicionPersona.get('terminos') as FormControl;
          }

          get terminosErrors() {
            if (this.terminosField.hasError('required')) {
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
        // this.fnDisableDatosPersona();
        this.fnCargaDepartamentos();
        this.listaTipoDocumento = [{ value: 1, label: 'DNI' }, { value: 2, label: 'Carnet de Extranjería' }];
        this.listaSexo = [{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }];
        this.listaRubro = [{ value: 1, label: 'Pesca' }, { value: 2, label: 'Industria' }, { value: 4, label: 'Otros' }];
        this.fnLimpiarDatos();
        this.ubigeoService.ObtenerUbigeo()
            .then(resp => {
                this.fnCargarUbigeo(resp.data);
            })
            .catch(err => []);
    }

    fnCargarUsuario = (data) => {
      this.formEdicionPersona.patchValue({
          idPersona: data.id,
          tipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
          tipoDocumento: data.idTipoIdentificacion,
          numeroDocumento: data.nroDocumento,
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
    fnDisableDatosPersona(){
        this.formEdicionPersona.controls['nombres'].disable();
        this.formEdicionPersona.controls['apellidos'].disable();
      }

    fnCargarDatos = (data) => {
        this.formEdicionPersona.patchValue({
            idPersona: data.id,
            tipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
            nombres: data.nombres,
            apellidos: data.apellidos,
            celular: data.celular,
            correo: data.email,
            direccion: data.direccion
          });
    }

    fnCargaDepartamentos = () =>{
    this.ubigeoService.ObtenerDepartamentos()
        .then(resp => {
          if (resp) {
            this.listaDepartamentos = resp.data;
          }
          else {

          }
        })
        .catch(err => []);
    }

    fnCargaProvincias = (value : any) =>{
        this.ubigeoService.ObtenerProvincias(
            value
        )
            .then(resp => {
              if (resp) {
                this.listaProvincias = resp.data;
              }
              else {

              }
            })
            .catch(err => []);
        }

    fnCargaDistritos = (value : any) =>{
        this.ubigeoService.ObtenerDistritos(
            value
        )
            .then(resp => {
                if (resp) {
                this.listaDistritos = resp.data;
                }
                else {

                }
            })
            .catch(err => []);
        }


    fnCargarUbigeo = (data) => {
        const lista = data.split('¬');
        const nReg = lista.length;
        let campos;
        this.listaDepartamentos = [];
        listaDepartamentosTemp = [];
        listaProvinciasTemp = [];
        listaDistritosTemp = [];
        for (let i = 0; i < nReg; i++) {
            campos = lista[i].split('¦');
            if (campos[0].substr(4, 2) !== '00') {
                listaDistritosTemp.push({
                    value: campos[0],
                    label: campos[1],
                    latitud: campos[2],
                    longitud: campos[3]
                });
            }
            else if (campos[0].substr(2, 2) !== '00') {
                listaProvinciasTemp.push({
                    value: campos[0],
                    label: campos[1],
                    latitud: campos[2],
                    longitud: campos[3]
                });
            }
            else {
                if (campos[0] !== '000000') {
                    listaDepartamentosTemp.push({
                        value: campos[0],
                        label: campos[1],
                        latitud: campos[2],
                        longitud: campos[3]
                    });
                }
            }
        }
        this.listaDepartamentos = listaDepartamentosTemp;
    }

    fnBtnPersonaBuscar = () => {

       if(this.formEdicionPersona.get('numeroDocumento').value != '' && this.formEdicionPersona.get('tipoDocumento').value != ''){

        this.comunService.buscarPersonaEmpresa({
            NroDocumento: this.formEdicionPersona.get('numeroDocumento').value,
            IdTipoIdentificacion: this.formEdicionPersona.get('tipoDocumento').value,
        })
            .then(resp => {
                this.fnCargarDatos(resp.data);
            })
            .catch(err => []);
        }else{
            this._alertService.alertWarning("Ingrese tipo y número de documento")
        }
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

    editarPersona() {
        if (this.formEdicionPersona.valid) {
            this._alertService.alertConfirm(
                "",
                "¿Está seguro que desea guardar esta información?",
                () => {
            this.comunService.registrarPersona({
                Id: this.formEdicionPersona.get('idPersona').value,
                IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
                IdTipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
                CodigoDepartamento: this.formEdicionPersona.get('departamento').value,
                CodigoProvincia: this.formEdicionPersona.get('provincia').value.substr(2, 2),
                CodigoDistrito: this.formEdicionPersona.get('distrito').value.substr(4, 2),
                IdTipoIdentificacion: this.formEdicionPersona.get('tipoDocumento').value,
                RazonSocial: this.formEdicionPersona.get('razonSocial').value,
                Nombres: this.formEdicionPersona.get('nombres').value,
                Apellidos: this.formEdicionPersona.get('apellidos').value,
                NroDocumento: this.formEdicionPersona.get('numeroDocumento').value,
                Direccion: this.formEdicionPersona.get('direccion').value,
                Celular: this.formEdicionPersona.get('celular').value,
                Email: this.formEdicionPersona.get('correo').value,
                Flag: this.enumerado.TIPO_ACCION.EDITAR
                // NroDocPerNatural: this.formEdicionPersona.get('numeroDocumento').value
                // Contrasena: this.formEdicionPersona.get('contrasena').value
            })
                .then(resp => {
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
                        // alert("Error en registrarse");
                    }
                })
                .catch(err => {
                    this._alertService.alertError("Ha ocurrido un error");
                });
            });
            }
    }

    fnChangeDepartamento = (valor: any) => {
        this.listaProvincias = listaProvinciasTemp.filter(item => {
            return item.value.substr(0, 2) === valor.substr(0, 2);
        });
    }
    fnChangeProvincias = (valor: any) => {
        this.listaDistritos = listaDistritosTemp.filter(item => {
            return item.value.substr(0, 4) === valor.substr(0, 4);
        });
    }
    fnChangeTipoDocumento = (valor: any) => {
        this.formEdicionPersona.patchValue({
            numeroDocumento: '',
            nombres: '',
            apellidos: '',
            razonSocial: '',
            departamento:'',
            provincia: '',
            distrito:''
        });
        switch (this.formEdicionPersona.get('tipoDocumento').value) {
            case '1':
                // this.codigoTipoDocumento = 'dni';
                this.longitudDocumento = 8;
                // this.setValidationsTypeDocumentDNI();
                break;
            case '2':
                // this.codigoTipoDocumento = 'cex';
                this.longitudDocumento = 12;
                // this.setValidationsTypeDocumentCEX();
                break;
            default:
                // this.codigoTipoDocumento = '';
                // this.setValidationsInit();
                break;
        }
    }
}




