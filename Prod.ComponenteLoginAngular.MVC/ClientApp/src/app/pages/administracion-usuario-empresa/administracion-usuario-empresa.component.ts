import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { enumerados } from 'src/app/enums/enumerados';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import * as CryptoJS from 'crypto-js';  

const key = 'TUc0emRqRXpkdw==';
@Component({
  selector: 'app-administracion-usuario-empresa',
  templateUrl: './administracion-usuario-empresa.component.html',
  styleUrls: ['./administracion-usuario-empresa.component.css']
})
export class AdministracionUsuarioEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaUsuariosAsignados: Array<any>;
  isVisiblePrincipal : boolean = true;
  isVisibleEditarUsuario : boolean = false;
  isVisibleAgregarUsuario : boolean = false;
  estado_act_desac: boolean = false;
  nombresEditar: string = null;
  apellidosEditar : string = null;
  id_personaEditar: string = null;
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
  idUsuario: boolean = false;
  rucPrincipal: string = "";
  id_aplicacion : number = 0;
  var : string ="";
  constructor(
    private componenteLoginService: ComponenteLoginService,
    private spinner: NgxSpinnerService,
    private _alertService: AlertService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.var = params['var'] || null;     
      this.obtenerRucDesencriptado(); 
    });
  }

  async obtenerRucDesencriptado(){
    let Data = {
      NroDocumento : this.var
    }
    this.componenteLoginService.obtenerRucDesencriptado(Data)
      .then(async resp => {
        this.rucPrincipal = resp;
        await this.Listar_usuarios_representante_legal();
      })
      .catch(err => []);
  }

  async Listar_usuarios_representante_legal () {
    let Data = {
      NroDocumento : this.rucPrincipal
    }
    this.componenteLoginService.Listar_usuarios_representante_legal(Data)
      .then(async resp => {
        this.listaUsuariosAsignados = resp.data;
      })
      .catch(err => []);
  }
  




  AbrirEditarUsuario = (app)=>{
    this.isVisibleEditarUsuario = true; 
    this.isVisibleAgregarUsuario = false;
    this.isVisiblePrincipal = false;  

    let Data = {
        NroDocumento: app.numeroDocumento,
      }
      this.componenteLoginService.ObtenerPersonaPorRepresentanteLegal(Data)
      .then(resp => {
        if(resp.success){
        this.nombresEditar = app.nombres;
        this.apellidosEditar = app.apellidoPaterno;
        this.numeroDocEditar = app.numeroDocumento;
        this.correoEditar = app.correo;
        this.celularEditar = app.telefono;
        this.id_personaEditar = resp.data.id_persona;
        this.estado_act_desac = app.activo
        this.idUsuario = app.idUsuario

        }
      })
      .catch(err =>[]);
    }
  

    BtnEditarUsuario = () =>{
      let Data = {
        id_persona: this.id_personaEditar,             
        correo: this.correoEditar,
        telefono: this.celularEditar,
        RUC:this.rucPrincipal,
        NumeroDocumento: this.numeroDocEditar,
        id_contacto_extranet: this.idUsuario,
        activo: this.estado_act_desac
      };
      this.spinner.show();
      this.componenteLoginService.CambiarEstadoUsuarioPorRepresentanteLegal(Data)
      .then(resp => {
        this.spinner.hide();
        if(resp.success){
          this._alertService.alertOk(resp.messages[0],"",
          () => {
            this.dialog.closeAll();
            this.BtnCancelar();
        });
        }
        else{
          this._alertService.alertError(resp.messages[0]);
        }
      })
      .catch(err =>[]);
    }


  BtnAgregarUsuario= () =>{ 
      this.isVisibleAgregarUsuario = true;
      this.isVisiblePrincipal = false;  
      this.isVisibleEditarUsuario = false; 
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
        this.direccionNew = resp.data.direccion,
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





  BtnCancelar= () =>{ 
    this.isVisiblePrincipal = true; 
    this.isVisibleEditarUsuario = false;
    this.isVisibleAgregarUsuario = false;  
    this.limpiar();
    this.Listar_usuarios_representante_legal();
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

   limpiar =()=>
   {

    this.numeroDocEditar = null;
    this.numeroDocNew = null;
    this.celularEditar  = null;
    this.celularNew = null;
    this.correoEditar  = null;
    this.correoNew  = null;
    this.nombresNew  = null;
    this.apellidosNew  = null;
    this.id_personaNew = null;
    this.cod_departamentoNew = null;
    this.cod_provinciaNew  = null;
    this.cod_distritoNew = null;
    this.direccionNew  = null;
    this.validadorNroDocumentoEditar = false;
    this.validadorCelularEditar  = false;
    this.validadorCelularLengthEditar  = false;
    this.validadorCorreoEditar = false;
    this.validadorCorreoInvalidoEditar  = false;
    this.validadorNroDocumentoNew = false;
    this.validadorCorreoNew = false;
    this.validadorCorreoInvalidoNew  = false;
    this.validadorNombresNew = false;
    this.validadorCelularNew = false;
    this.validadorCelularLengthNew  = false;
    this.validadorApellidosNew = false;

   }

  registroEmpresaService = () => 
  {
    this._alertService.alertConfirm(  
      "",
      "¿Está seguro que desea guardar esta información?",
      () => {
        this.spinner.show();
          let Data = {
          Id: Number(this.id_personaNew),
          IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
          IdTipoPersona: this.enumerado.TIPO_PERSONA.NATURAL,
          CodigoDepartamento: this.cod_departamentoNew,
          CodigoProvincia: this.cod_provinciaNew,
          CodigoDistrito: this.cod_distritoNew, 
          IdTipoIdentificacion: 1,
          RazonSocial: "",
          Nombres: this.nombresNew,
          Apellidos: this.apellidosNew,
          NroDocumento: this.numeroDocNew,
          Direccion: this.direccionNew,
          Celular: this.celularNew,
          Email: this.correoNew,
          Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
          NroDocPerNatural: this.numeroDocNew,
          Contrasena: null,
          id_aplicacion: Number(this.id_aplicacion),
          ruc: this.rucPrincipal
        }
        this.componenteLoginService.RegistrarNuevoUsuario(Data)
        .then(resp => {
          this.spinner.hide();
          if (resp.success) {
            if(resp.messages.length > 0){

              this._alertService.alertOk(resp.messages[0],"",
              () => {
                this.dialog.closeAll();
                this.BtnCancelar();
              });
            }
            else{
              this._alertService.alertOk("Registro exitoso");
            }
          }
          else {
          this._alertService.alertError("Ha ocurrido un error");
          // alert("Error en registrarse");
          }
        })
        .catch(err => {
          this._alertService.alertError("Ha ocurrido un error");
          this.spinner.hide();
        });
    });
  }

  CancelarSesion = () =>{
    window.location.href = ('https://derapipez.produce.gob.pe/Producto/Producto/Index');
   }

}
