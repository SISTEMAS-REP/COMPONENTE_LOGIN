import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-edicion-perfil-empresa',
  templateUrl: './edicion-perfil-empresa.component.html',
  styleUrls: ['./edicion-perfil-empresa.component.css']
})
export class EdicionPerfilEmpresaComponent implements OnInit {

  tipoDoc: number = 0;
  numeroDoc: string = null;
  apellidos: string = null;
  nombres: string = null;
  celular: string = null;
  correo: string = null;

  isVisiblePerfil : boolean = true;
  isVisibleRepresentante : boolean = true;
  isVisibleContacto : boolean = true;

  isVisibleEditarContacto : boolean = false;
  isVisibleEditarRepresentante : boolean = false;
  isVisibleEditarImg : boolean = false;


   //Variables validador
   validadorTipoDocumento :  boolean = false;
   validadorNroDocumento :  boolean = false;
   validadorApellidos :  boolean = false;
   validadorNombres :  boolean = false;
   validadorCelular :  boolean = false;
   validadorCelularLength : boolean = false;
   validadorCorreo :  boolean = false;
   validadorCorreoInvalido : boolean = false;

   isDisableNroDocumento: boolean = true;


  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private _alertService: AlertService
    ){}

  ngOnInit() {
  }


  
  btnGuardarRepresentante = () =>{
    //this.changeTipoDocumento();
    this.changeNroDocumento();
    this.changeNombres();
    this.changeApellidos();
 
    debugger;
      if( !this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres){
        this.isVisiblePerfil = true;  
        this.isVisibleRepresentante = true; 
        this.isVisibleEditarRepresentante = false; 
        this.limpiar();
      }       
  }

  btnGuardarContacto = () =>{
    this.changeCelular();
    this.changeCorreo();
 
      if(!this.validadorCelular &&   !this.validadorCelularLength && !this.validadorCorreo && !this.validadorCorreoInvalido){
        let Data = {
          Id: 2496732, //cambiar
          Email: this.correo,
          Telefono: this.celular,
          idContactoExtranet: 15357//cambiar
        }
        const formData = {...Data};
        // this.http.post(this.baseUrl + 'ComponenteLogin/UpdateCorreoTelefonoPersona', formData).subscribe((result : any) => {
        //   debugger
        //   alert(result.messages[0]);
        //   this.isVisiblePerfil = true;  
        //   this.isVisibleContacto = true; 
        //   this.isVisibleEditarContacto = false;  
        //   this.limpiar();
        //   }, error => console.error(error));
  
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
        this.spinner.hide();
        this.nombres = resp.data.nombres;
          this.apellidos = resp.data.apellidos;
          // this.changeTipoDocumento();
          this.changeApellidos();
          this.changeNombres();
          })
          .catch(err => {
             this._alertService.alertWarning("El número de documento es invalido.")
             this.nombres = null;
             this.apellidos = null;
          });
        }
    }
  

  clickEditarRepresentante = () =>{ 
    this.isVisibleEditarRepresentante = true;
    this.isVisibleRepresentante = false;  
  }

  clickEditarContacto = () =>{ 
    this.isVisibleEditarContacto = true;
    this.isVisibleContacto = false; 
  
  }

  clickEditarImg= () =>{ 
    this.isVisibleEditarImg = true;
    this.isVisiblePerfil = false;  
    this.isVisibleEditarRepresentante = false; 
    this.isVisibleRepresentante = false; 
    this.isVisibleEditarContacto = false; 
    this.isVisibleContacto = false;  
  }

  clickCancelarContacto= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true; 
    this.isVisibleEditarContacto = false;  
    this.limpiar();
  }

  clickCancelarRepresentante= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleRepresentante = true; 
    this.isVisibleEditarRepresentante = false; 
    this.limpiar();
  }

  clickCancelarImg= () =>{ 
    this.isVisiblePerfil = true;
    this.isVisibleRepresentante  = true;
    this.isVisibleContacto = true;
    this.isVisibleEditarContacto = false; 
    this.isVisibleEditarRepresentante = false; 
    this.isVisibleEditarImg = false; 

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
    this.tipoDoc = 0;
    this.numeroDoc = null;
    this.apellidos = null;
    this.nombres = null;
    this.celular = null;
    this.correo = null;

    //Variables validador
    this.validadorTipoDocumento = false;
    this.validadorNroDocumento = false;
    this.validadorApellidos = false;
    this.validadorNombres = false;
    this.validadorCelular = false;
    this.validadorCelularLength = false;
    this.validadorCorreo = false;
    this.validadorCorreoInvalido = false;

    this.isDisableNroDocumento = true;
  }
}
