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
  rep_correo: string = null;
  contrasena: string = null;
  rep_contrasena: string = null;

  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  isVisiblePaso3 : boolean = false;
  isVisiblePaso4 : boolean = false;


  //Variables validador
  validadorRuc :  boolean = false;
  validadorRazonSocial :  boolean = false;
  validadorDireccion:  boolean = false;
  validadorTipoDocumento :  boolean = false;
  validadorNroDocumento :  boolean = false;
  validadorApellidos :  boolean = false;
  validadorNombres :  boolean = false;
  validadorCelular :  boolean = false;
  validadorCorreo :  boolean = false;
  validadorCorreoRep :  boolean = false;
  validadorCorreoRepetir : boolean = false;
  validadorContrasena :  boolean = false;
  validadorContrasenaRep :  boolean = false;
  validadorContrasenaRepetir : boolean = false;
  //Validador Contraseña
  Validar8Digitos : boolean = false;
  ValidarNumeros : boolean = false;
  ValidarMayuscula: boolean = false;
  ValidarSimbolo: boolean = false;

  ispaso1 : boolean = true;
  ispaso2 : boolean = true;
  ispaso3 : boolean = true;
  ispaso4 : boolean = true;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
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
    debugger
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
    debugger
    this.changeTipoDocumento(0);
    this.changeNroDocumento();
    this.changeApeliidos();
    this.changeNombres();
 
      if(!this.validadorTipoDocumento && !this.validadorNroDocumento && !this.validadorApellidos && !this.validadorNombres){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = false;
        this.isVisiblePaso3 = true;
        this.isVisiblePaso4 = false;
        this.ispaso3 = false;
        this.ispaso4 = true;
      }       
  }

  clickPaso4 = () =>{
    debugger
    this.changeCelular();
    this.changeCorreo();
    this.changeCorreoRep();
 
      if(!this.validadorCelular && !this.validadorCorreo && !this.validadorCorreo2 && !this.validadorCorreoRep&& !this.validadorCorreoRepetir){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = false;
        this.isVisiblePaso3 = false;
        this.isVisiblePaso4 = true;
        this.ispaso4 = false;
      }       
  }


  

  //validador

  changeRuc = () =>{
    debugger
    if(this.ruc == null || this.ruc == ""){
      this.validadorRuc = true;
    }
    else{
      this.validadorRuc = false;
    }
  } 

  changeRazonSocial = () =>{
    debugger
    if(this.razonSocial== null || this.razonSocial == ""){
      this.validadorRazonSocial = true;
    }
    else{
      this.validadorRazonSocial = false;
    }
  } 

  changeDireccion = () =>{
    debugger
    if(this.direccion == null || this.direccion == ""){
      this.validadorDireccion = true;
    }
    else{
      this.validadorDireccion = false;
    }
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

  changeNroDocumento = () =>{
    debugger
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

  validadorCorreo2 : boolean = false;
  changeCorreo = () =>{
    if(this.correo != null)
    {
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
      if (reg.test(this.correo) && regOficial.test(this.correo)) {
        this.validadorCorreo2 = false;
      } else if (reg.test(this.correo)) {
        this.validadorCorreo2 = false;
  
      } else {
        this.validadorCorreo2 = true;
      }
    }
  

    if(this.correo == null || this.correo == ""){
      this.validadorCorreo = true;
    }
    else{
      this.validadorCorreo = false;
    }
  }

  changeCorreoRep = () =>{
    if(this.rep_correo == null || this.rep_correo == ""){
      this.validadorCorreoRep = true;
    }
    else{
      this.validadorCorreoRep = false;
    }

    if(this.correo != null || this.rep_correo != null){
      if(this.correo != this.rep_correo){
        this.validadorCorreoRepetir = true;
      }
      else{
        this.validadorCorreoRepetir = false;
      }
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



    if(this.contrasena.length == 0){
      this.validadorContrasena = true;
    }
    else{
      this.validadorContrasena = false;
    }
  }

  changeContrasenaRep = () =>{
    if(this.rep_contrasena.length == 0){
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
