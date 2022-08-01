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
  contrasena_rep: string = null;
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
  validadorRucDigitos: boolean = false;

  isDisableNroDocumento : boolean = true;
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
        this.limpiar();
        alert("El registro se guardo con exito.");


      }
      else{
        alert(result.messages[0]);
      }
      
    }, error => console.error(error));
  }
}


  limpiar =()=>
  {
    this.ruc = null;
    this.tipoDoc = 0;
    this.numeroDoc = null;
    this.apellidos = null;
    this.nombres = null;
    this.celular = null;
    this.correo = null;
    this.contrasena = null;
    this.contrasena_rep = null;
    this.tengoRuc = false;
    this.terminos_politica = false;
    this.terminos_mensajeria = false;

    this.cod_departamento = null;
    this.cod_provincia = null;
    this.cod_distrito = null;
    this.direccion = null;


    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.ispaso2 = true;

    //Variables validador
    this.validadorRuc = true;
    this.validadorTipoDocumento = false;
    this.validadorNroDocumento = false;
    this.validadorApellidos = false;
    this.validadorNombres = false;
    this.validadorCelular = false;
    this.validadorCelularLength = false;
    this.validadorCorreo = false;
    this.validadorCorreoInvalido = false;
    this.validadorContrasena = false;
    this.validadorContrasenaRep = false;
    this.validadorContrasenaRepetir = false;
    //Validador Contraseña
    this.Validador8Digitos = false;
    this.ValidadorNumeros = false;
    this.ValidadorMayuscula = false;
    this.ValidadorSimbolo = false;
    this.validadorRequisitosContrasena = false;
    this.validadorTerminos = false;

    this.isDisableNroDocumento = true;
  }


  btnBuscarDNI = () =>{
    let Data = {
      NroDocumento : this.numeroDoc,
      IdTipoIdentificacion : 1
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/BuscarPersonaEmpresa', formData).subscribe((result : any) => {
      if(result.success){
        this.nombres = result.data.nombres;
        this.apellidos = result.data.apellidos;
        this.cod_departamento = result.data.codigoDepartamento;
        this.cod_provincia = result.data.codigoProvincia;
        this.cod_distrito =result.data.codigoProvincia
        this.direccion = result.data.codigoProvincia
        // this.changeTipoDocumento();
        this.changeApeliidos();
        this.changeNombres();
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



  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.ispaso2 = true;
  }
  clickPaso2 = () =>{
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


}
