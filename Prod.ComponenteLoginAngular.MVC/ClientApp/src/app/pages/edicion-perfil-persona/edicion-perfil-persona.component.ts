import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-edicion-perfil-persona',
  templateUrl: './edicion-perfil-persona.component.html',
  styleUrls: ['./edicion-perfil-persona.component.css']
})
export class EdicionPerfilPersonaComponent implements OnInit {
  celular: string = null;
  correo: string = null;


  isVisiblePerfil : boolean = true;
  isVisibleContacto : boolean = true;
  isVisibleEditarContacto : boolean = false;
  isVisibleEditarImg : boolean = false;

  //Variables validador
  validadorCelular :  boolean = false;
  validadorCelularLength : boolean = false;
  validadorCorreo :  boolean = false;
  validadorCorreoInvalido : boolean = false;
  var : string ="";
  constructor(
    private componenteLoginService: ComponenteLoginService,
    private spinner: NgxSpinnerService,
    private _alertService: AlertService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.var = params['var'] || null;
      this.obtenerDatosUsuario();
    });
  }

  btnGuardarContacto = () => {
    this.changeCelular();
    this.changeCorreo();

    if(!this.validadorCelular &&   !this.validadorCelularLength && !this.validadorCorreo && !this.validadorCorreoInvalido){
      this._alertService.alertConfirm(
     "",
     "¿Está seguro que actualizar los datos?",
     () => {
    this.spinner.show();
    let Data = {
      Id: this.id_persona, //cambiar
      Email: this.correo,
      Telefono: this.celular,
      Usuario: this.usuario//cambiar
    }
     this.componenteLoginService.UpdateCorreoTelefonoPersona(Data)
      .then(resp => {
       this.spinner.hide();
       if (resp.success) {
        this._alertService.alertOk("Actualizacion exitosa"),
        this.isVisiblePerfil = true;  
        this.isVisibleContacto = true; 
        this.isVisibleEditarContacto = false;  
        this.limpiar();
       }
       else {
         this._alertService.alertError("Error al actualizar");
       }
     })
     .catch(err => []);
   });
   }
 }

  dni : string = "";
  nombre_completo: string = "";
  direccion: string = "";
  id_persona: number = 0;
  usuario: string ="";
  obtenerDatosUsuario = () =>{
    let Data = {
      NroDocumento : this.var
    }
    this.componenteLoginService.obtenerDatosUsuario(Data)
        .then(resp => {
        this.id_persona = resp.data.id;
        this.dni = resp.data.nroDocPerNatural;
        this.nombre_completo = resp.data.nombreCompleto;
        this.direccion = resp.data.direccion;
        this.celular = resp.data.celular;
        this.correo = resp.data.email;
        this.usuario = resp.data.usuario;
        })
        .catch(err => []);
  }

  clickEditarContacto = () =>{ 
    this.isVisibleEditarContacto = true;
    this.isVisibleContacto = false;   
  }

  clickEditarImg= () =>{ 
    this.isVisibleEditarImg = true;
    this.isVisiblePerfil = false;  
    this.isVisibleEditarContacto = false; 
    this.isVisibleContacto = false;  
  }

  clickCancelarContacto= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true;  
    this.isVisibleEditarContacto = false; 
    this.limpiar();
  }

  clickCancelarImg= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true;  
    this.isVisibleEditarContacto = false;
    this.isVisibleEditarImg = false; 
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
    // this.celular = null;
    // this.correo = null;

    //Variables validador
    this.validadorCelular = false;
    this.validadorCelularLength = false;
    this.validadorCorreo = false;
    this.validadorCorreoInvalido = false;

  }

  ClickRegresar = () =>{
    window.location.href = ('https://derapipez.produce.gob.pe/Producto/Producto/Index');
   }
}
