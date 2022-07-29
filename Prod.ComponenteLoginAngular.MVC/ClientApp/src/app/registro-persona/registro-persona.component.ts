import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {
  ruc: string = null;
  tipoDoc: number = 0;
  numeroDoc: string = null;
  apellidos: string = null;
  nombres: string = null;
  celular: string = null;
  correo: string = null;
  contrasena: string = null;
  rep_contrasena: string = null;
  tengoRuc: boolean = false;
  terminos_politica : boolean = false;
  terminos_mensajeria : boolean = false;

  cod_departamento : string = null;
  cod_provincia : string = null;
  cod_distrito : string = null;
  direccion : string = null;


  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  ispaso2 : boolean = true;

  //Variables validador
  validadorRuc :  boolean = true;
  validadorTipoDocumento :  boolean = false;
  validadorNroDocumento :  boolean = false;
  validadorApellidos :  boolean = false;
  validadorNombres :  boolean = false;
  validadorCelular :  boolean = false;
  validadorCelularLength : boolean = false;
  validadorCorreo :  boolean = false;
  validadorCorreoInvalido : boolean = false;
  validadorContrasena :  boolean = false;
  validadorContrasenaRep :  boolean = false;
  validadorContrasenaRepetir : boolean = false;
  //Validador Contraseña
  Validador8Digitos : boolean = false;
  ValidadorNumeros : boolean = false;
  ValidadorMayuscula: boolean = false;
  ValidadorSimbolo: boolean = false;
  validadorRequisitosContrasena : boolean = false;
  validadorTerminos: boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit() {
    //this.registroPersonaService();
    //this.tipoDoc = 1;
  }

  registroPersonaService = () =>{
     this.changeCorreo();
     this.changeContrasena();
     this.changeContrasenaRep();
     this.changeTerminos();

    // if(!this.validadorRuc  &&  !this.validadorTipoDocumento &&  !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular && !this.validadorCelularLength && this.validadorCorreo && this.validadorContrasena && this.validadorContrasenaRep && this.validadorContrasenaRepetir && !this.ValidadorNumeros && !this.Validador8Digitos && !this.ValidadorMayuscula && !this.ValidadorSimbolo && !this.ValidadorRequisitos)
    // {
    //   alert("Debe cumplir las validaciones.");
    //   return;
    // }

    if(!this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular  && !this.validadorCelularLength  && !this.validadorCorreo && !this.validadorContrasena && !this.validadorContrasenaRep && !this.validadorContrasenaRepetir  && !this.validadorRequisitosContrasena && !this.validadorTerminos ){
    let Data = {
      Id: 0,
      IdSector: 2, // 1: persona Natural // 2: persona juridica
      IdTipoPersona: 1,
      CodigoDepartamento: this.cod_departamento,
      CodigoProvincia: this.cod_provincia,
      CodigoDistrito: this.cod_distrito,
      IdTipoIdentificacion: 1,
      RazonSocial: "",
      Nombres: this.nombres,
      Apellidos: this.apellidos,
      NroDocumento: this.numeroDoc, //para persona juridica mandas el ruc
      Direccion: this.direccion,
      Celular: this.celular,
      Email: this.correo,
      Flag: "A",
      NroDocPerNatural: this.numeroDoc,//para persona juridica mandas el dni
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
}


  buscarReniec = () =>{
    let Data = {
      NroDocumento : this.numeroDoc
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/buscarReniec', formData).subscribe((result : any) => {
      if(result.data.data != null){
        this.nombres = result.data.data.nombre;
        this.apellidos = result.data.data.apellidoPaterno + " " + result.data.data.apellidoMaterno;
        this.cod_departamento = result.data.data.codigoDepartamento;
        this.cod_provincia = result.data.data.codigoProvincia;
        this.cod_distrito = result.data.data.codigoDistrito;
        this.direccion = result.data.data.direccion;
      }
      else{
        alert("El número de DNI es incorrecto.");
        this.nombres = null;
        this.apellidos = null;
        this.cod_departamento = null;
        this.cod_provincia = null;
        this.cod_distrito = null;
        this.direccion = null;
      }
    }, error => console.error(error));
  }



  changeTengoRuc= (item) =>
  {
    this.tengoRuc;
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.ispaso2 = true;
  }
  clickPaso2 = () =>{
    this.changeTipoDocumento();
    this.changeNroDocumento();
    this.changeApeliidos();
    this.changeNombres();
    this.changeCelular();

    if(this.tengoRuc){
        if(!this.validadorRuc  &&  !this.validadorTipoDocumento &&  !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular && !this.validadorCelularLength){
          this.isVisiblePaso1 = false;
          this.isVisiblePaso2 = true;
          this.ispaso2 = false;
        }     
    }  
    else{
      if(!this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular  && !this.validadorCelularLength){
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

  
  changeTipoDocumento = () =>
  {   
    if(this.tipoDoc == 0){
      this.validadorTipoDocumento = true;
    }
    else{
      this.validadorTipoDocumento = false;
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

  changeTerminos = () =>{
    if(this.terminos_mensajeria == null || this.terminos_mensajeria == false || this.terminos_politica == null || this.terminos_politica == false  ){
      this.validadorTerminos = true;
    }
    else{
      this.validadorTerminos = false;
    }
  }


  mostrarContrasena(){
    let elemento :any = document.getElementById('contrasena');
    
    if(elemento.type == "password"){
      elemento.type = "text";
    }
    else{
      elemento.type = "password";
    }
  }

  mostrarContrasenaRepe(){
    let elemento :any = document.getElementById('rep_contrasena');
    
    if(elemento.type == "password"){
      elemento.type = "text";
    }
    else{
      elemento.type = "password";
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
