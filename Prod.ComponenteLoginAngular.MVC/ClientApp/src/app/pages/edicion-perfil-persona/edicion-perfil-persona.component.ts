import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  btnGuardarContacto = () =>{
    this.changeCelular();
    this.changeCorreo();
    debugger
      if(!this.validadorCelular &&   !this.validadorCelularLength && !this.validadorCorreo && !this.validadorCorreoInvalido){
        debugger
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
    this.celular = null;
    this.correo = null;

    //Variables validador
    this.validadorCelular = false;
    this.validadorCelularLength = false;
    this.validadorCorreo = false;
    this.validadorCorreoInvalido = false;

  }

}