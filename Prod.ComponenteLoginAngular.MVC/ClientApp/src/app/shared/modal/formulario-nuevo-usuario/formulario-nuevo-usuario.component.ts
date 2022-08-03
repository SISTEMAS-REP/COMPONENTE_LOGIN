import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { ComunService } from '../../../services/comun.service';
import { UbigeoService } from '../../../services/ubigeo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import {AdministrarUsuarioService}from '../../../../app/services/administrarUsuario';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
let listaDepartamentosTemp = null;
let listaProvinciasTemp = null;
let listaDistritosTemp = null;
@Component({
  selector: 'app-formulario-nuevo-usuario',
  templateUrl: './formulario-nuevo-usuario.component.html',
  styleUrls: ['./formulario-nuevo-usuario.component.css']
})
export class FormularioNuevoUsuarioComponent implements OnInit {
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
  formRegistroPersona: FormGroup;
  codigoTipoDocumento = '';
  longitudDocumento = 0;
  isHidden: boolean = true;

  constructor(private route: Router,
        private comunService: ComunService,
        private administrarUsuarioService : AdministrarUsuarioService,
        private ubigeoService: UbigeoService,
        private fb: FormBuilder,
        public dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private _alertService: AlertService) { 
          this.formRegistroPersona = this.fb.group({ 
            idPersona: ['', []],
            tipoPersona: ['', []],
            direccion: ['', []],
            tipoDocumento: ['', [Validators.required]],
            numeroDocumento: ['', [Validators.pattern('[0-9]*')]],
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
            // contrasena: ['', [Validators.required, 
            //   Validators.minLength(8)]],
            // tieneRuc: ['false', [Validators.required]],
            // terminos: ['', [Validators.required]]
          });
          this.formRegistroPersona.get('departamento').valueChanges.subscribe(valor => { this.departamentoSeleccionado = valor; this.fnCargaProvincias(valor) }); // Subscribimos a los cambios
          this.formRegistroPersona.get('provincia').valueChanges.subscribe(valor => { this.provinciaSeleccionado = valor; this.fnCargaDistritos(valor) }); // Subscribimos a los cambios
        }
  
        get tipoDocumentoField() {
          return this.formRegistroPersona.get('tipoDocumento') as FormControl;
        }
      
        get tipoDocumentoErrors() {
          if (this.tipoDocumentoField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get nroDocPerNaturalField() {
          return this.formRegistroPersona.get('nroDocPerNatural') as FormControl;
        }
      
        get nroDocPerNaturalErrors() {
          if (this.nroDocPerNaturalField.hasError('required')) {
            return 'Este campo es requerido';
          }
          switch (this.formRegistroPersona.get('tipoDocumento').value) {
            case 1:
                this.formRegistroPersona.patchValue({
                  nroDocPerNatural: this.numberOnlyClear(this.nroDocPerNaturalField.value)
                });

                if (this.nroDocPerNaturalField.hasError('minlength')) {
                    return 'La longitud mínima es de 8 caracteres.';
                }
                if (this.nroDocPerNaturalField.hasError('maxlength')) {
                    return 'La longitud máxima es de 8 caracteres.';
                }
                if (this.nroDocPerNaturalField.hasError('pattern')) {
                    return 'Este campo solo permite números';
                }
                break;

            case 2:
                this.formRegistroPersona.patchValue({
                  nroDocPerNatural: this.alphanumericOnlyClearTypeDocument(this.nroDocPerNaturalField.value)
                });
                if (this.nroDocPerNaturalField.hasError('minlength')) {
                    return 'La longitud mínima es de 9 caracteres.';
                }

                if (this.nroDocPerNaturalField.hasError('maxlength')) {
                    return 'La longitud máxima es de 12 caracteres.';
                }
                if (this.nroDocPerNaturalField.hasError('pattern')) {
                    return 'Este campo sólo permite caracteres alfanuméricos.';
                }
                break;
            default:
                break;
        }
          return '';
        }

        get numeroDocumentoField() {
          return this.formRegistroPersona.get('numeroDocumento') as FormControl;
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
          if (this.numeroDocumentoField.hasError('pattern')) {
              return 'El primer dígito debe ser 1.';
          }
          return '';
        }

        get razonSocialField() {
          return this.formRegistroPersona.get('razonSocial') as FormControl;
        }
      
        get razonSocialErrors() {
          if (this.razonSocialField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get nombresField() {
          return this.formRegistroPersona.get('nombres') as FormControl;
        }
      
        get nombresErrors() {
          if (this.nombresField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get apellidosField() {
          return this.formRegistroPersona.get('apellidos') as FormControl;
        }
      
        get apellidosErrors() {
          if (this.apellidosField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get departamentoField() {
          return this.formRegistroPersona.get('departamento') as FormControl;
        }
      
        get departamentoErrors() {
          if (this.departamentoField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get provinciaField() {
          return this.formRegistroPersona.get('provincia') as FormControl;
        }
      
        get provinciaErrors() {
          if (this.provinciaField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get distritoField() {
          return this.formRegistroPersona.get('distrito') as FormControl;
        }
      
        get distritoErrors() {
          if (this.distritoField.hasError('required')) {
            return 'Este campo es requerido';
          }
          return '';
        }

        get celularField() {
          return this.formRegistroPersona.get('celular') as FormControl;
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
          return this.formRegistroPersona.get('correo') as FormControl;
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

        // get contrasenaField() {
        //   return this.formRegistroPersona.get('contrasena') as FormControl;
        // }
      
        // get contrasenaErrors() {
        //   if (this.contrasenaField.hasError('required')) {
        //     return 'Este campo es requerido';
        //   }
        //   if (this.contrasenaField.hasError('minlength')) {
        //     return 'La longitud mínima es de 8 caracteres.';
        //   }
        //   return '';
        // }

        // get tieneRucField() {
        //   return this.formRegistroPersona.get('tieneRuc') as FormControl;
        // }
      
        // get tieneRucErrors() {
        //   if (this.tieneRucField.hasError('required')) {
        //     return 'Este campo es requerido';
        //   }
        //   return '';
        // }

        // get terminosField() {
        //   return this.formRegistroPersona.get('terminos') as FormControl;
        // }
      
        // get terminosErrors() {
        //   if (this.terminosField.hasError('required')) {
        //     return 'Este campo es requerido';
        //   }
        //   return '';
        // }

        ngOnInit(): void {
          this.fnCargaInicial();
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

        fnDisableDatosPersona(){
            this.formRegistroPersona.controls['nombres'].disable();
            this.formRegistroPersona.controls['apellidos'].disable();
        }

        fnCargarDatos = (data) => {

            this.formRegistroPersona.patchValue({
                idPersona: data.id,
                tipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
                nombres: data.nombres,
                apellidos: data.apellidos,
                celular: data.celular,
                correo: data.email,
                // direccion: data.direccion,
                // departamento: data.codigoDepartamento,
                // provincia: data.codigoProvincia,
                // distrito: data.codigoDistrito,
              });
        }

        fnCargarDatosRUC = (data) => {

          this.formRegistroPersona.patchValue({
            // idPersona: data.id,
            razonSocial: data.razonSocial,
            // direccion: data.direccion,
            // departamento: data.codigoDepartamento,
            // provincia: data.codigoProvincia,
            // distrito: data.codigoDistrito
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

        fnBtnRUCBuscar = () => {
          if(this.formRegistroPersona.get('numeroDocumento').value != ''){
          this.comunService.buscarPersonaEmpresa({
            NroDocumento: this.formRegistroPersona.get('numeroDocumento').value,
            IdTipoIdentificacion: this.enumerado.TIPO_DE_DOCUMENTO_PERSONA.RUC
          })
            .then(resp => {
              this.fnCargarDatosRUC(resp.data);
            })
            .catch(err => []);
          }else{
            this._alertService.alertWarning("Ingrese número de documento")
          }
        }
    
        fnBtnPersonaBuscar = () => {
    
           if(this.formRegistroPersona.get('nroDocPerNatural').value != '' && this.formRegistroPersona.get('tipoDocumento').value != ''){
    
            this.comunService.buscarPersonaEmpresa({
                NroDocumento: this.formRegistroPersona.get('nroDocPerNatural').value,
                IdTipoIdentificacion: this.formRegistroPersona.get('tipoDocumento').value,
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

        fnBtnRegistrar = () => {
          this.comunService.registrarPersona({
              Id: this.formRegistroPersona.get('idPersona').value,
              IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
              IdTipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
              CodigoDepartamento: this.formRegistroPersona.get('departamento').value,
              CodigoProvincia: this.formRegistroPersona.get('provincia').value.substr(2, 2),
              CodigoDistrito: this.formRegistroPersona.get('distrito').value.substr(4, 2),
              IdTipoIdentificacion: this.formRegistroPersona.get('tipoDocumento').value,
              RazonSocial: this.formRegistroPersona.get('razonSocial').value,
              Nombres: this.formRegistroPersona.get('nombres').value,
              Apellidos: this.formRegistroPersona.get('apellidos').value,
              NroDocumento: this.formRegistroPersona.get('nroDocPerNatural').value,
              Direccion: this.formRegistroPersona.get('direccion').value,
              Celular: this.formRegistroPersona.get('celular').value,
              Email: this.formRegistroPersona.get('correo').value,
              Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
              NroDocPerNatural: this.formRegistroPersona.get('nroDocPerNatural').value,
              Contrasena: this.formRegistroPersona.get('contrasena').value
          })
              .then(resp => {
                  if (resp.data.id > 0) {
                      this.route.navigateByUrl('/sesion-persona').then(e => {
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
  
        registrarPersona() {
            if (this.formRegistroPersona.valid) {
                this._alertService.alertConfirm(
                    "",
                    "¿Está seguro que desea guardar esta información?",
                    () => {
                      this.spinner.show();
                      this.administrarUsuarioService.RegistrarNuevoUsuario({
                          Id: this.formRegistroPersona.get('idPersona').value,
                          IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
                          IdTipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
                          CodigoDepartamento: this.formRegistroPersona.get('departamento').value,
                          CodigoProvincia: this.formRegistroPersona.get('provincia').value.substr(2, 2),
                          CodigoDistrito: this.formRegistroPersona.get('distrito').value.substr(4, 2),
                          IdTipoIdentificacion: this.formRegistroPersona.get('tipoDocumento').value,
                          RazonSocial: this.formRegistroPersona.get('razonSocial').value,
                          Nombres: this.formRegistroPersona.get('nombres').value,
                          Apellidos: this.formRegistroPersona.get('apellidos').value,
                          NroDocumento: this.formRegistroPersona.get('nroDocPerNatural').value,
                          Direccion: this.formRegistroPersona.get('direccion').value,
                          Celular: this.formRegistroPersona.get('celular').value,
                          Email: this.formRegistroPersona.get('correo').value,
                          Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
                          NroDocPerNatural: this.formRegistroPersona.get('nroDocPerNatural').value
                          // Contrasena: this.formRegistroPersona.get('contrasena').value
                      })
                      .then(resp => {
                        this.spinner.hide();
                          if(resp.success){
                            this._alertService.alertOk(resp.messages[0],"",
                            () => {
                              this.dialog.closeAll();
                            });
                          }
                          else{
                            this._alertService.alertError("Ha ocurrido un error");
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
    
            this.formRegistroPersona.patchValue({
                nroDocPerNatural: '',
                numeroDocumento: '',
                nombres: '',
                apellidos: '',
                razonSocial: '',
                departamento:'',
                provincia: '',
                distrito:''
            });
            switch (this.formRegistroPersona.get('tipoDocumento').value) {
                case 1:
                    this.codigoTipoDocumento = 'dni';
                    this.longitudDocumento = 8;
                    this.setValidationsTypeDocumentDNI();
                    break;
                case 2:
                    this.codigoTipoDocumento = 'cex';
                    this.longitudDocumento = 12;
                    this.setValidationsTypeDocumentCEX();
                    break;
                default:
                    this.codigoTipoDocumento = '';
                    // this.setValidationsInit();
                    break;
            }
        }
  
        setValidationsTypeDocumentDNI() {
    
          const document = this.formRegistroPersona.get('nroDocPerNatural');
          document.setValidators([Validators.minLength(8),
          Validators.maxLength(8),
          Validators.required,
          Validators.pattern('[0-9]*')]);
          document.updateValueAndValidity();
        }
  
        setValidationsTypeDocumentCEX() {
      
            const document = this.formRegistroPersona.get('nroDocPerNatural');
            document.setValidators([Validators.minLength(9),
            Validators.maxLength(12),
            Validators.required,
            Validators.pattern('[a-zA-Z0-9]*')]);
            document.updateValueAndValidity();
        }
    
        onChangeTieneRuc = (value: any) => {
          if(value == "true"){
            this.isHidden = false;
            const numeroDocumento = this.formRegistroPersona.get('numeroDocumento');
            numeroDocumento.setValidators([Validators.required,Validators.minLength(11),
              Validators.maxLength(11),
              Validators.pattern('(1)[0-9]*')]);
            numeroDocumento.updateValueAndValidity();
      
            const razonSocial = this.formRegistroPersona.get('razonSocial');
            razonSocial.setValidators([Validators.required,Validators.minLength(3),
              Validators.maxLength(500)]);
            razonSocial.updateValueAndValidity();
          }
          else{
            this.isHidden = true;
            const numeroDocumento = this.formRegistroPersona.get('numeroDocumento');
            numeroDocumento.clearValidators();
            numeroDocumento.updateValueAndValidity();
      
            const razonSocial = this.formRegistroPersona.get('razonSocial');
            razonSocial.clearValidators();
            razonSocial.updateValueAndValidity();
            }
        }
  
        numberOnly(event): boolean {
          const charCode = (event.which) ? event.which : event.keyCode;
          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              return false;
          }
          return true;
        }
  
        numberOnlyClear(cadena) {
          return cadena.trim().replace(/[^0-9]/g, "");
        }
  
        alphanumericOnlyClearTypeDocument(cadena) {
            return cadena.trim().replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        }
    

}
