import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { enumerados } from 'src/app/enums/enumerados';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  id_aplicacion : number = 0;
  ruc: string  = null;
  razonSocial: string = null;
  direccion: string = null;
  tipoDoc: number = 0;
  numeroDoc: string = null;
  id_persona: string = null;
  apellidos: string = null;
  nombres: string = null;
  celular: string = null;
  correo: string = null;
  correo_rep: string = null;
  contrasena: string = null;
  contrasena_rep: string = null;
  terminos_politica : boolean = false;
  terminos_mensajeria : boolean = false;
  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  isVisiblePaso3 : boolean = false;
  isVisiblePaso4 : boolean = false;
  cod_departamento: string = null;
  cod_provincia : string = null;
  cod_distrito : string = null;
  //Variables validador
  validadorRuc :  boolean = false;
  validadorRazonSocial :  boolean = false;
  validadorDireccion:  boolean = false;
  validadorTipoDocumento :  boolean = false;
  validadorNroDocumento :  boolean = false;
  validadorApellidos :  boolean = false;
  validadorNombres :  boolean = false;
  validadorCelular :  boolean = false;
  validadorCelularLength : boolean = false;
  validadorCorreo :  boolean = false;
  validadorCorreoRep :  boolean = false;
  validadorCorreoRepetir : boolean = false;
  validadorCorreoInvalido : boolean = false;
  validadorContrasena :  boolean = false;
  validadorContrasenaRep :  boolean = false;
  validadorContrasenaRepetir : boolean = false;
  //Validador Contraseña
  Validador8Digitos : boolean = false;
  ValidadorNumeros : boolean = false;
  ValidadorMayuscula: boolean = false;
  ValidadorSimbolo: boolean = false;
  validadorTerminos: boolean = false;
  validadorRequisitosContrasena : boolean = false;
  ispaso1 : boolean = true;
  ispaso2 : boolean = true;
  ispaso3 : boolean = true;
  ispaso4 : boolean = true;
  isDisableNroDocumento: boolean = true
  validadorRucDigitos: boolean = false;
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _alertService: AlertService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id_aplicacion = params['id_aplicacion'] || null;
      this.obtenerImagenByAplicacion();
    });
  }

  obtenerImagenByAplicacion = () =>{
    let Data = {
      id_aplicacion: Number(this.id_aplicacion) 
    }

    this.componenteLoginService.obtenerImagenByAplicacion(Data)
      .then(resp => {
        var binary = atob(resp.data.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var e = 0; e < len; e++) {
          view[e] = binary.charCodeAt(e);
        }
        var blob = new Blob([view], { type: this.contentType });
        var urlArchivo = URL.createObjectURL(blob);
        this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
      })
      .catch(err => []);
  }


  registroEmpresaService = () => {
    if(!this.validadorRuc  &&  !this.validadorTipoDocumento &&  !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular && !this.validadorCelularLength && !this.validadorCorreo && !this.validadorContrasena && !this.validadorContrasenaRep && !this.validadorContrasenaRepetir   && !this.validadorRequisitosContrasena && !this.validadorTerminos ){  
      this._alertService.alertConfirm(
          "",
          "¿Está seguro que desea guardar esta información?",
          () => {
            this.spinner.show();

              let Data = {
              Id: Number(this.id_persona),
              IdSector: this.enumerado.TIPO_SECTOR_PERSONA.PESQUERIA,
              IdTipoPersona: this.enumerado.TIPO_PERSONA.JURIDICA,
              CodigoDepartamento: this.cod_departamento,
              CodigoProvincia: this.cod_provincia,
              CodigoDistrito: this.cod_distrito, 
              IdTipoIdentificacion: Number(this.tipoDoc),
              RazonSocial: this.razonSocial,
              Nombres: this.nombres,
              Apellidos: this.apellidos,
              NroDocumento: this.ruc,
              Direccion: this.direccion,
              Celular: this.celular,
              Email: this.correo,
              Flag: this.enumerado.ESTADO_PERSONA.ACTIVO,
              NroDocPerNatural: this.numeroDoc,
              Contrasena: this.contrasena,
              id_aplicacion: Number(this.id_aplicacion)
            }
            this.componenteLoginService.RegistroPersona(Data)
            .then(resp => {
              this.spinner.hide();
              if (resp.data.value > 0) {
              if(resp.messages.length > 0){

             this._alertService.alertWarning(resp.messages[0],
             () => {}
             );
             this.limpiar();
        }
        else{
          this._alertService.alertOk(
            "Registro exitoso",
            '',
            () => {
              this.route.navigateByUrl('/sesion-empresa').then(e => {
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
        this.spinner.hide();
      });
    });
  }
}

  btnBuscarRUC = () =>{
    if(!this.validadorRuc  && !this.validadorRucDigitos){
    this.spinner.show();
    let Data = {
      NroDocumento : this.ruc,
      IdTipoIdentificacion : 8
    }
    this.componenteLoginService.buscarPersonaEmpresa(Data)
    .then(resp => {
      if(resp.data != null){
      this.spinner.hide();
        this.id_persona =resp.data.id,
        this.razonSocial = resp.data.razonSocial;
        this.cod_departamento = resp.data.codigoDepartamento;
        this.cod_provincia = resp.data.codigoProvincia;
        this.cod_distrito  = resp.data.codigo_distrito;
        this.direccion = resp.data.direccion;
        this.changeRazonSocial();
        this.changeDireccion();
        }
        else{
          this.razonSocial = null;
          this.cod_departamento = null;
          this.cod_provincia = null;
          this.cod_distrito = null;
          this.direccion = null;
          this.spinner.hide();
          this._alertService.alertWarning("El número de RUC es invalido.")
        }
        
      })
        .catch(err => {});
      }
  }

  btnBuscarDNI = () =>{
    if(!this.validadorNroDocumento  && !this.validadorTipoDocumento){
      this.spinner.show();
      let Data = {
        NroDocumento : this.numeroDoc,
        IdTipoIdentificacion : 1
      }
      this.componenteLoginService.buscarPersonaEmpresa(Data)
      .then(resp => {
        if(resp.data != null){
        this.spinner.hide();
        this.nombres = resp.data.nombres;
          this.apellidos = resp.data.apellidos;
          // this.changeTipoDocumento();
          this.changeApellidos();
          this.changeNombres();
          }
          else {        
            this.nombres = null;
            this.apellidos = null;
            this._alertService.alertWarning("El número de documento es invalido.")
            this.spinner.hide();
          }         
        })
          .catch(err => {});
        }
    }


  clickPaso1 = () =>{ 
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = false;
    this.ispaso2 = true;
    this.ispaso3 = true;
    this.ispaso4 = true;
  }

  clickPaso2 = () =>{
    this.changeRuc();
    this.changeRazonSocial();
    this.changeDireccion();
 
      if(!this.validadorRuc && !this.validadorRazonSocial && !this.validadorDireccion){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = true;
        this.isVisiblePaso3 = false;
        this.isVisiblePaso4 = false;
        this.ispaso2 = false;
        this.ispaso3 = true;
        this.ispaso4 = true;
      }       
  }

  clickPaso3 = () =>{
    //this.changeTipoDocumento();
    this.changeNroDocumento();
    this.changeApellidos();
    this.changeNombres();
 
      if(!this.validadorRuc && !this.validadorRazonSocial && !this.validadorDireccion && !this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = false;
        this.isVisiblePaso3 = true;
        this.isVisiblePaso4 = false;
        this.ispaso3 = false;
        this.ispaso4 = true;
        this.ispaso2 = false;
      }    
  }

  clickPaso4 = () =>{
    this.changeCelular();
    this.changeCorreo();
    this.changeCorreoRep();
 
      if(!this.validadorRuc && !this.validadorRazonSocial && !this.validadorDireccion && !this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular &&   !this.validadorCelularLength && !this.validadorCorreo && !this.validadorCorreoInvalido && !this.validadorCorreoRep && !this.validadorCorreoRepetir){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = false;
        this.isVisiblePaso3 = false;
        this.isVisiblePaso4 = true;
        this.ispaso4 = false;
        this.ispaso2 = false;
        this.ispaso3 = false;
      }       
  }


  

  //validador

  changeRuc = () =>{
    if(this.ruc == null || this.ruc == ""){
      this.validadorRuc = true;
      this.validadorRucDigitos = false
    }
    else{      
      if( this.ruc.length < 11){    
        this.validadorRucDigitos = true;
        this.validadorRuc = false;
      }
      else {
        this.validadorRucDigitos = false;
        this.validadorRuc = false;
      }  

    }
  } 

  changeRazonSocial = () =>{
    if(this.razonSocial== null || this.razonSocial == ""){
      this.validadorRazonSocial = true;
    }
    else{
      this.validadorRazonSocial = false;
    }
  } 

  changeDireccion = () =>{
    if(this.direccion == null || this.direccion == ""){
      this.validadorDireccion = true;
    }
    else{
      this.validadorDireccion = false;
    }
  } 

  changeTipoDocumento = () =>
  {   
    this.numeroDoc = null;
    this.apellidos = null;
    this.nombres = null;
    if(this.tipoDoc == 0){
      this.validadorTipoDocumento = true;
      this.isDisableNroDocumento = true;
    }
    else{
      this.validadorTipoDocumento = false;
      this.isDisableNroDocumento = false;
    }
  }

  changeNroDocumento = () =>{   
    if(this.numeroDoc == null || this.numeroDoc == ""){
      this.validadorNroDocumento = true;
      this.changeTipoDocumento();
    }
    else{
      this.validadorNroDocumento = false;
    }
  }
  
  changeApellidos = () =>{
    if(this.apellidos == null || this.apellidos == ""){
      this.validadorApellidos = true;
    }
    else{
      this.validadorApellidos = false;
    }
  }

  changeNombres = () =>{
    if(this.nombres == null || this.nombres == ""){
      this.validadorNombres = true;
    }
    else{
      this.validadorNombres = false;
    }
  }

  
  changeCelular = () =>{
    if(this.celular == null || this.celular == ""){
      this.validadorCelular = true;
      this.validadorCelularLength = false;
    }
    else{
      if( this.celular.length < 9){    
        this.validadorCelularLength = true;
        this.validadorCelular = false;
      }
      else {
        this.validadorCelular = false;
        this.validadorCelularLength = false;
      }     
    }
  }



  changeCorreo = () =>{
    if(this.correo == null || this.correo == ""){
      this.validadorCorreo = true;
      this.validadorCorreoInvalido = false;
    }
    else{
      
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
      if (reg.test(this.correo) && regOficial.test(this.correo)) {
        this.validadorCorreoInvalido = false;
        this.validadorCorreo = false;
      } else if (reg.test(this.correo)) {
        this.validadorCorreoInvalido = false;
        this.validadorCorreo = false;
  
      } else {
        this.validadorCorreoInvalido = true;
        this.validadorCorreo = false;
      }    
    }
  }


  changeCorreoRep = () =>{
    if(this.correo_rep == null || this.correo_rep == ""){
      this.validadorCorreoRep = true;
    }
    else{
      this.validadorCorreoRep = false;
    }

    if(this.correo != null || this.correo_rep != null){
      if(this.correo != this.correo_rep){
        this.validadorCorreoRepetir = true;
      }
      else{
        this.validadorCorreoRepetir = false;
      }
    }
  }


   changeContrasena = () =>{
    var name=this.contrasena;
    if(this.contrasena != null){

      var regex = /(\d+)/g;
      var pr = name.match(regex);
  
      if(pr != null){
        this.ValidadorNumeros = true;
      }
      else{
        this.ValidadorNumeros = false;
      }
  
      var regexMayusc = /[A-Z]/g;
      var pr2 = name.match(regexMayusc);
     
      if(pr2 != null){
        this.ValidadorMayuscula = true;
      }
      else{
        this.ValidadorMayuscula = false;
      }
  
      var regexSimbolo = /[^\w]/g;
      var pr3 = name.match(regexSimbolo);
  
     
      if(pr3 != null){
        this.ValidadorSimbolo = true;
      }
      else{
        this.ValidadorSimbolo = false;
      }
  
  
      if(this.contrasena.length > 8){
        this.Validador8Digitos = true;
      }
      else{
        this.Validador8Digitos = false;
      }
    }


    if(this.contrasena == null || this.contrasena == ""){
      this.validadorContrasena = true;
      this.validadorRequisitosContrasena = false;
    }
    else{
      
      if ( this.ValidadorSimbolo && this.ValidadorMayuscula && this.ValidadorNumeros && this.Validador8Digitos ) {
        this.validadorRequisitosContrasena = false;
        this.validadorContrasena = false;
      } 
      else {
        this.validadorRequisitosContrasena = true;
        this.validadorContrasena = false;
      }    
    }

  }


  changeContrasenaRep = () =>{
    if(this.contrasena_rep == null || this.contrasena_rep == ""){
      this.validadorContrasenaRep = true;
    }
    else{
      this.validadorContrasenaRep = false;
    }

    if(this.contrasena != null || this.contrasena_rep != null){
      if(this.contrasena != this.contrasena_rep){
        this.validadorContrasenaRepetir = true;
      }
      else{
        this.validadorContrasenaRepetir = false;
      }
    }
  }

  changeTerminos = () =>{
    if(this.terminos_mensajeria == null || this.terminos_mensajeria == false || this.terminos_politica == null || this.terminos_politica == false  ){
      this.validadorTerminos = true;
    }
    else{
      this.validadorTerminos = false;
    }
  }


  mostrarContrasena(){
    let contrasena :any = document.getElementById('contrasena');
    let eyeContrasena :any = document.getElementById('eyeContrasena');
    
    if(contrasena.type == "password"){
      contrasena.type = "text";
      eyeContrasena.style.opacity=0.8;
    }
    else{
      contrasena.type = "password";
      eyeContrasena.style.opacity=0.4;
    }
  }

  mostrarContrasenaRepe(){
    let contrasena_rep :any = document.getElementById('contrasena_rep');
    let eyeContrasena_rep :any = document.getElementById('eyeContrasena_rep');
    
    if(contrasena_rep.type == "password"){
      contrasena_rep.type = "text";
      eyeContrasena_rep.style.opacity=0.8;
    }
    else{
      contrasena_rep.type = "password";
      eyeContrasena_rep.style.opacity=0.4;
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


   limpiar =()=>{
    this.ruc= null;
    this.razonSocial = null;
    this.direccion = null;
    this.tipoDoc = 0;
    this.numeroDoc = null;
    this.apellidos = null;
    this.nombres = null;
    this.celular = null;
    this.correo = null;
    this.correo_rep = null;
    this.contrasena = null;
    this.contrasena_rep = null;
    this.terminos_politica = false;
    this.terminos_mensajeria = false;
  
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = false;
  
    this.cod_departamento = null;
    this.cod_provincia = null;
    this.cod_distrito = null;
  
  
    //Variables validador
    this.validadorRuc = false;
    this.validadorRazonSocial = false;
    this.validadorDireccion = false;
    this.validadorTipoDocumento = false;
    this.validadorNroDocumento = false;
    this.validadorApellidos = false;
    this.validadorNombres = false;
    this.validadorCelular = false;
    this.validadorCelularLength = false;
    this.validadorCorreo = false;
    this.validadorCorreoRep = false;
    this.validadorCorreoRepetir = false;
    this.validadorCorreoInvalido = false;
    this.validadorContrasena = false;
    this.validadorContrasenaRep = false;
    this.validadorContrasenaRepetir = false;
    //Validador Contraseña
    this.Validador8Digitos = false;
    this.ValidadorNumeros = false;
    this.ValidadorMayuscula = false;
    this.ValidadorSimbolo = false;
    this.validadorTerminos = false;
    this.validadorRequisitosContrasena = false;
  
    this.ispaso1 = true;
    this.ispaso2 = true;
    this.ispaso3 = true;
    this.ispaso4 = true;
  
    this.isDisableNroDocumento = true;
   }
}
