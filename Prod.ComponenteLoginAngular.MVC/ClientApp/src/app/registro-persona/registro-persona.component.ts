import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {
  ruc: string = null;
  tipoDoc: number = null;
  numeroDoc: string = null;
  apellidos: string = null;
  nombres: string = null;
  celular: string = null;
  correo: string = null;
  contrasena: string = null;
  rep_contrasena: string = null;
  tengoRuc: boolean = false;

  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;

  //Varibles validador
  validadorRuc :  boolean = false;
  validadorTipoDocumento :  boolean = false;
  validadorNroDocumento :  boolean = false;
  validadorApellidos :  boolean = false;
  validadorNombres :  boolean = false;
  validadorCelular :  boolean = false;
  validadorCorreo :  boolean = false;
  validadorContrasena :  boolean = false;
  validadorContrasenaRep :  boolean = false;
  validadorContrasenaRepetir : boolean = false;

  //Validador Contraseña
  Validar8Digitos : boolean = false;
  ValidarNumeros : boolean = false;
  ValidarMayuscula: boolean = false;
  ValidarSimbolo: boolean = false;

  ispaso2: boolean = true;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit() {
    //this.registroPersonaService();
    this.tipoDoc = 1;
  }

  registroPersonaService = () =>{
    debugger
    this.changeCorreo();
    this.changeContrasena();
    this.changeContrasenaRep();

    if(!this.validadorCorreo && !this.validadorContrasena && !this.validadorContrasenaRep){
      if(!this.ValidarNumeros || !this.Validar8Digitos || !this.ValidarMayuscula || !this.ValidarSimbolo || this.validadorContrasenaRepetir)
      {
        return;
      }
      
    }
    let Data = {
      Id: 0,
      IdSector: 2,
      IdTipoPersona: 1,
      CodigoDepartamento: "01",
      CodigoProvincia: "01",
      CodigoDistrito: "01",
      IdTipoIdentificacion: 1,
      RazonSocial: "",
      Nombres: this.nombres,
      Apellidos: this.apellidos,
      NroDocumento: this.numeroDoc,
      Direccion: "Direccion reniec",
      Celular: this.celular,
      Email: this.correo,
      Flag: "A",
      NroDocPerNatural: this.numeroDoc,
      Contrasena: this.contrasena
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/RegistroPersona', formData).subscribe((result : any) => {
      if(result.data != null){
        alert("El registro se guardo con exito.");
      }
      else{
        alert(result.messages[0]);
      }
      
    }, error => console.error(error));
  }


  buscarReniec = () =>{
    let Data = {
      NroDocumento : this.numeroDoc
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/buscarReniec', formData).subscribe(result => {
    }, error => console.error(error));
  }




  changeTipoDocumento = () =>
  {   
    if(this.tipoDoc == 0){
      this.validadorTipoDocumento = true;
    }
    else{
      this.validadorTipoDocumento = false;
    }
  }

  changeTengoRuc= () =>
  {
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
  }
  clickPaso2 = () =>{
    this.changeNroDocumento();
    this.changeApeliidos();
    this.changeNombres();
    this.changeCelular();

    if(this.tengoRuc){
        if(!this.validadorRuc  &&  !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular){
          this.isVisiblePaso1 = false;
          this.isVisiblePaso2 = true;
          this.ispaso2 = false;
        }     
    }  
    else{
      if(!this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = true;
        this.ispaso2 = false;
      } 
    }  
  }





  //validador

  changeRuc = () =>{
    if(this.ruc == null || this.ruc == ""){
      this.validadorRuc = true;
    }
    else{
      this.validadorRuc = false;
    }
  } 

  changeNroDocumento = () =>{
    if(this.numeroDoc == null || this.numeroDoc == ""){
      this.validadorNroDocumento = true;
    }
    else{
      this.validadorNroDocumento = false;
    }
  }
  
  changeApeliidos = () =>{
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
    }
    else{
      this.validadorCelular = false;
    }
  }

  changeCorreo = () =>{
    if(this.correo == null || this.correo == ""){
      this.validadorCorreo = true;
    }
    else{
      this.validadorCorreo = false;
    }
  }

  changeContrasena = () =>{
    if(this.contrasena != null)
    {
        var name=this.contrasena;
        var regex = /(\d+)/g;
        var pr = name.match(regex);

        if(pr != null){
          this.ValidarNumeros = true;
        }
        else{
          this.ValidarNumeros = false;
        }

        var regexMayusc = /[A-Z]/g;
        var pr2 = name.match(regexMayusc);
      
        if(pr2 != null){
          this.ValidarMayuscula = true;
        }
        else{
          this.ValidarMayuscula = false;
        }

        var regexSimbolo = /[^\w]/g;
        var pr3 = name.match(regexSimbolo);

      
        if(pr3 != null){
          this.ValidarSimbolo = true;
        }
        else{
          this.ValidarSimbolo = false;
        }



        if(this.contrasena.length > 8){
          this.Validar8Digitos = true;
        }
        else{
          this.Validar8Digitos = false;
        }
    }
    
    if(this.contrasena == null || this.contrasena == ""){
      this.validadorContrasena = true;
    }
    else{
      this.validadorContrasena = false;
    }
  }

  changeContrasenaRep = () =>{
    debugger
    if(this.rep_contrasena == null || this.rep_contrasena == ""){
      this.validadorContrasenaRep = true;
    }
    else{
      this.validadorContrasenaRep = false;
    }

    if(this.contrasena != null || this.rep_contrasena != null){
      if(this.contrasena != this.rep_contrasena){
        this.validadorContrasenaRepetir = true;
      }
      else{
        this.validadorContrasenaRepetir = false;
      }
    }
  }

}
