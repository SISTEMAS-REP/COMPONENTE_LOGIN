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
  validadorRuc :  boolean = true;
  validadorTipoDocumento :  boolean = false;
  validadorNroDocumento :  boolean = true;
  validadorApellidos :  boolean = true;
  validadorNombres :  boolean = true;
  validadorCelular :  boolean = true;
  validadorCorreo :  boolean = true;
  validadorContrasena :  boolean = true;
  validadorContrasenaRep :  boolean = true;

  //Validador Contraseña
  Validar8Digitos : boolean = false;
  ValidarNumeros : boolean = false;
  ValidarMayuscula: boolean = false;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit() {
    //this.registroPersonaService();
    this.tipoDoc = 1;
  }

  registroPersonaService = () =>{
    if(!this.validadorRuc){
      return;
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




  changeTipoDocumento = (item) =>
  {   
    if(this.tipoDoc == 0){
      this.validadorTipoDocumento = true;
    }
    else{
      this.validadorTipoDocumento = false;
    }
  }

  changeTengoRuc= (item) =>
  {
    this.tengoRuc;
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
  }
  clickPaso2 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = true;
  }





  //validador

  changeRuc = (item) =>{
    if(this.ruc.length == 0){
      this.validadorRuc = true;
    }
    else{
      this.validadorRuc = false;
    }
  } 

  changeNroDocumento = (item) =>{
    if(this.numeroDoc.length == 0){
      this.validadorNroDocumento = true;
    }
    else{
      this.validadorNroDocumento = false;
    }
  }
  
  changeApeliidos = (item) =>{
    if(this.apellidos.length == 0){
      this.validadorApellidos = true;
    }
    else{
      this.validadorApellidos = false;
    }
  }

  changeNombres = (item) =>{
    if(this.nombres.length == 0){
      this.validadorNombres = true;
    }
    else{
      this.validadorNombres = false;
    }
  }
  

  changeCelular = (item) =>{
    if(this.celular.length == 0){
      this.validadorCelular = true;
    }
    else{
      this.validadorCelular = false;
    }
  }

  changeCorreo = (item) =>{
    if(this.correo.length == 0){
      this.validadorCorreo = true;
    }
    else{
      this.validadorCorreo = false;
    }
  }

  changeContrasena = (item) =>{
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

    debugger

    if(this.contrasena.length > 8){
      this.Validar8Digitos = true;
    }
    else{
      this.Validar8Digitos = false;
    }



    if(this.contrasena.length == 0){
      this.validadorContrasena = true;
    }
    else{
      this.validadorContrasena = false;
    }
  }

  changeContrasenaRep = (item) =>{
    if(this.rep_contrasena.length == 0){
      this.validadorContrasenaRep = true;
    }
    else{
      this.validadorContrasenaRep = false;
    }
  }

}
