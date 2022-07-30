import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  ruc: string  = null;
  razonSocial: string = null;
  direccion: string = null;
  tipoDoc: number = 0;
  numeroDoc: string = null;
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

 isDisableNroDocumento: boolean = true;

 validadorRucDigitos: boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  registroEmpresaService = () =>{
    this.changeContrasena();
    this.changeContrasenaRep();
    this.changeTerminos();

   // if(!this.validadorRuc  &&  !this.validadorTipoDocumento &&  !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular && !this.validadorCelularLength && this.validadorCorreo && this.validadorContrasena && this.validadorContrasenaRep && this.validadorContrasenaRepetir && !this.ValidadorNumeros && !this.Validador8Digitos && !this.ValidadorMayuscula && !this.ValidadorSimbolo && !this.ValidadorRequisitos)
   // {
   //   alert("Debe cumplir las validaciones.");
   //   return;
   // }

   if(!this.validadorRuc && !this.validadorRazonSocial &&  !this.validadorDireccion && !this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres && !this.validadorCelular  && !this.validadorCelularLength  && !this.validadorCorreo && !this.validadorContrasena && !this.validadorContrasenaRep && !this.validadorContrasenaRepetir  && !this.validadorRequisitosContrasena && !this.validadorTerminos ){
   let Data = {
     Id: 0,
     IdSector: 1, // 1: persona Natural // 2: persona juridica
     IdTipoPersona: 1,
     CodigoDepartamento: this.cod_departamento,
     CodigoProvincia: this.cod_provincia,
     CodigoDistrito: this.cod_distrito,
     IdTipoIdentificacion: 1,
     RazonSocial: "",
     Nombres: this.nombres,
     Apellidos: this.apellidos,
     NroDocumento: this.ruc, //para persona juridica mandas el ruc
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

  btnBuscarRUC = () =>{
    if(this.ruc.length != 11){
      //this.validadorRuc = true;
      this.validadorRucDigitos = true;
      this.razonSocial = null;
      this.cod_departamento = null;
      this.cod_provincia = null;
      this.cod_distrito = null;
      this.direccion = null;
      return;
    }
    else{
      this.validadorRucDigitos = false;
    }


    let Data = {
      NroDocumento : this.ruc,
      IdTipoIdentificacion : 8
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/BuscarPersonaEmpresa', formData).subscribe((result : any) => {
      if(result.data != null){
        this.razonSocial = result.data.razonSocial;
        this.cod_departamento = result.data.codigoDepartamento;
        this.cod_provincia = result.data.codigoProvincia;
        this.cod_distrito  = result.data.codigo_distrito;
        this.direccion = result.data.direccion;
        this.changeRazonSocial();
        this.changeDireccion();
      }
      else{
        alert("El número de RUC es incorrecto.");
        this.razonSocial = null;
        this.cod_departamento = null;
        this.cod_provincia = null;
        this.cod_distrito = null;
        this.direccion = null;
      }
    }, error => console.error(error));
  }


  btnBuscarDNI = () =>{
    if(this.numeroDoc.length != 8){
      this.validadorTipoDocumento = true;
      this.nombres = null;
      this.apellidos = null;
    }

    let Data = {
      NroDocumento : this.numeroDoc,
      IdTipoIdentificacion : 1
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/BuscarPersonaEmpresa', formData).subscribe((result : any) => {
      if(result.data!= null){
        this.nombres = result.data.nombres;
        this.apellidos = result.data.apellidos;
        this.changeApeliidos();
        this.changeNombres();
      }
      else{
        alert("El número de DNI es incorrecto.");
        this.nombres = null;
        this.apellidos = null;
      }
    }, error => console.error(error));
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
    this.changeApeliidos();
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
    }
    else{
      this.validadorRuc = false;
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
