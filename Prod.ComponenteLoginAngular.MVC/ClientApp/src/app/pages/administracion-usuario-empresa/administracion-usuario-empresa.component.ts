import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-administracion-usuario-empresa',
  templateUrl: './administracion-usuario-empresa.component.html',
  styleUrls: ['./administracion-usuario-empresa.component.css']
})
export class AdministracionUsuarioEmpresaComponent implements OnInit {
  isVisiblePrincipal : boolean = true;
  isVisibleEditarUsuario : boolean = false;
  isVisibleAgregarUsuario : boolean = false;
  numeroDocEditar : string = null;
  numeroDocNew : string = null;
  celularEditar : string = null;
  celularNew : string = null;
  correoEditar : string = null;
  correoNew : string = null;
  nombresNew : string = null;
  apellidosNew : string = null;
  id_personaNew  : string = null;
  cod_departamentoNew  : string = null;
  cod_provinciaNew  : string = null;
  cod_distritoNew  : string = null;
  direccionNew  : string = null;
  validadorNroDocumentoEditar :  boolean = false;
  validadorCelularEditar :  boolean = false;
  validadorCelularLengthEditar :  boolean = false;
  validadorCorreoEditar :  boolean = false;
  validadorCorreoInvalidoEditar : boolean = false;
  validadorNroDocumentoNew :  boolean = false;
  validadorCorreoNew : boolean = false;
  validadorCorreoInvalidoNew :  boolean = false;
  validadorNombresNew :  boolean = false;
  validadorCelularNew : boolean = false;
  validadorCelularLengthNew : boolean = false;
  validadorApellidosNew : boolean = false;



  constructor(
    private componenteLoginService: ComponenteLoginService,
    private spinner: NgxSpinnerService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
  }


  btnBuscarDNI = () =>{
    if(!this.validadorNroDocumentoNew){
    this.spinner.show();
    let Data = {
      NroDocumento : this.numeroDocNew,
      IdTipoIdentificacion : 1
    }
    this.componenteLoginService.buscarPersonaEmpresa(Data)
    .then(resp => {
      if(resp.data != null){
      this.spinner.hide();
        this.id_personaNew =resp.data.id,
        this.nombresNew = resp.data.nombres;      
        this.apellidosNew = resp.data.apellidos;
        this.cod_departamentoNew = resp.data.codigoDepartamento;
        this.cod_provinciaNew = resp.data.codigoProvincia;
        this.cod_distritoNew =resp.data.codigoDistrito;
        this.direccionNew = resp.data.direccion
        // this.changeTipoDocumento();
        this.changeApellidosNew();
        this.changeNombresNew();
      }
      else{    
        this.nombresNew = null;
        this.apellidosNew = null;
        this.cod_departamentoNew = null;
        this.cod_provinciaNew = null;
        this.cod_distritoNew = null;
        this.direccionNew = null
        this._alertService.alertWarning("El número de documento es invalido.")
        this.spinner.hide();
      }   
      })
        .catch(err => {});
      }
  }


  BtnAgregarUsuario= () =>{ 
    this.isVisibleAgregarUsuario = true;
    this.isVisiblePrincipal = false;  
    this.isVisibleEditarUsuario = false; 
  }


  BtnEditarUsuario= () =>{ 
    this.isVisibleEditarUsuario = true; 
    this.isVisibleAgregarUsuario = false;
    this.isVisiblePrincipal = false;  

  }

  BtnCancelarContacto= () =>{ 
    this.isVisiblePrincipal = true; 
    this.isVisibleEditarUsuario = false;
    this.isVisibleAgregarUsuario = false;  
  }

  changeNroDocumentoEditar = () =>{
    if(this.numeroDocEditar == null || this.numeroDocEditar == ""){
      this.validadorNroDocumentoEditar = true;
    }
    else{
      this.validadorNroDocumentoEditar = false;
    }
  }

  
  changeNroDocumentoNew = () =>{
    if(this.numeroDocNew == null || this.numeroDocNew == ""){
      this.validadorNroDocumentoNew = true;
    }
    else{
      this.validadorNroDocumentoNew = false;
    }
  }


  changeCelularEditar = () =>{
    if(this.celularEditar == null || this.celularEditar == ""){
      this.validadorCelularEditar = true;
      this.validadorCelularLengthEditar = false;
    }
    else{
      if( this.celularEditar.length < 9){    
        this.validadorCelularLengthEditar = true;
        this.validadorCelularEditar = false;
      }
      else {
        this.validadorCelularEditar = false;
        this.validadorCelularLengthEditar = false;
      }     
    }
  }

  changeCelularNew = () =>{
    if(this.celularNew == null || this.celularNew == ""){
      this.validadorCelularNew = true;
      this.validadorCelularLengthNew = false;
    }
    else{
      if( this.celularNew.length < 9){    
        this.validadorCelularLengthNew = true;
        this.validadorCelularNew = false;
      }
      else {
        this.validadorCelularNew = false;
        this.validadorCelularLengthNew = false;
      }     
    }
  }

  changeCorreoEditar = () =>{
    if(this.correoEditar == null || this.correoEditar == ""){
      this.validadorCorreoEditar = true;
      this.validadorCorreoInvalidoEditar = false;
    }
    else{
      
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
      if (reg.test(this.correoEditar) && regOficial.test(this.correoEditar)) {
        this.validadorCorreoInvalidoEditar = false;
        this.validadorCorreoEditar = false;
      } else if (reg.test(this.correoEditar)) {
        this.validadorCorreoInvalidoEditar = false;
        this.validadorCorreoEditar = false;
  
      } else {
        this.validadorCorreoInvalidoEditar = true;
        this.validadorCorreoEditar = false;
      }    
    }
  }

  changeCorreoNew = () =>{
    if(this.correoNew == null || this.correoNew == ""){
      this.validadorCorreoNew = true;
      this.validadorCorreoInvalidoNew = false;
    }
    else{
      
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
      if (reg.test(this.correoNew) && regOficial.test(this.correoNew)) {
        this.validadorCorreoInvalidoNew = false;
        this.validadorCorreoNew = false;
      } else if (reg.test(this.correoNew)) {
        this.validadorCorreoInvalidoNew = false;
        this.validadorCorreoNew = false;
  
      } else {
        this.validadorCorreoInvalidoNew = true;
        this.validadorCorreoNew = false;
      }    
    }
  }


  changeNombresNew = () =>{
    if(this.nombresNew == null || this.nombresNew == ""){
      this.validadorNombresNew  = true;
    }
    else{
      this.validadorNombresNew  = false;
    }
  }

  changeApellidosNew = () =>{
    if(this.apellidosNew  == null || this.apellidosNew  == ""){
      this.validadorApellidosNew  = true;
    }
    else{
      this.validadorApellidosNew  = false;
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
