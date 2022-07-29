import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambiar-contrasena-empresa',
  templateUrl: './cambiar-contrasena-empresa.component.html',
  styleUrls: ['./cambiar-contrasena-empresa.component.css']
})
export class CambiarContrasenaEmpresaComponent implements OnInit {
  contrasenaActual: string = null;
  contrasenaNueva: string = null;
  contrasenaRep: string = null;

  validadorContrasenaActual :  boolean = false;
  validadorContrasenaNueva :  boolean = false;
  validadorContrasenaRep :  boolean = false;
  validadorContrasenaRepetir : boolean = false;
  //Validador Contraseña
  Validador8Digitos : boolean = false;
  ValidadorNumeros : boolean = false;
  ValidadorMayuscula: boolean = false;
  ValidadorSimbolo: boolean = false;
  validadorRequisitosContrasenaNueva : boolean = false;

  constructor() { }

  ngOnInit() {
  }


  changeContrasenaActual = () =>{
      if(this.contrasenaActual == null || this.contrasenaActual == ""){
        this.validadorContrasenaActual = true;
      }
      else{
        this.validadorContrasenaActual = false;
      }
    }

  mostrarContrasenaActual(){
      let contrasenaActual :any = document.getElementById('contrasenaActual');
      let eyeContrasenaActual :any = document.getElementById('eyeContrasenaActual');
      
      if(contrasenaActual.type == "password"){
        contrasenaActual.type = "text";
        eyeContrasenaActual.style.opacity=0.8;
      }
      else{
        contrasenaActual.type = "password";
        eyeContrasenaActual.style.opacity=0.4;
      }
    }

  
    changeContrasenaNueva = () =>{
      var name=this.contrasenaNueva;
      if(this.contrasenaNueva != null){
  
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
    
    
        if(this.contrasenaNueva.length > 8){
          this.Validador8Digitos = true;
        }
        else{
          this.Validador8Digitos = false;
        }
      }
  
  
      if(this.contrasenaNueva == null || this.contrasenaNueva == ""){
        this.validadorContrasenaNueva = true;
        this.validadorRequisitosContrasenaNueva = false;
      }
      else{
        
        if ( this.ValidadorSimbolo && this.ValidadorMayuscula && this.ValidadorNumeros && this.Validador8Digitos ) {
          this.validadorRequisitosContrasenaNueva = false;
          this.validadorContrasenaNueva = false;
        } 
        else {
          this.validadorRequisitosContrasenaNueva = true;
          this.validadorContrasenaNueva = false;
        }    
      }
  
    }

    changeContrasenaRep = () =>{
      if(this.contrasenaRep.length == 0){
        this.validadorContrasenaRep = true;
      }
      else{
        this.validadorContrasenaRep = false;
      }
  
      if(this.contrasenaNueva != null || this.contrasenaRep != null){
        if(this.contrasenaNueva != this.contrasenaRep){
          this.validadorContrasenaRepetir = true;
        }
        else{
          this.validadorContrasenaRepetir = false;
        }
      }
    }

  mostrarContrasenaNueva(){
      let contrasenaNueva :any = document.getElementById('contrasenaNueva');
      let eyeContrasenaNueva :any = document.getElementById('eyeContrasenaNueva');
      
      if(contrasenaNueva.type == "password"){
        contrasenaNueva.type = "text";
        eyeContrasenaNueva.style.opacity=0.8;
      }
      else{
        contrasenaNueva.type = "password";
        eyeContrasenaNueva.style.opacity=0.4;
      }
    }

    mostrarContrasenaRep(){
      let contrasenaRep :any = document.getElementById('contrasenaRep');
      let eyeContrasenaRep :any = document.getElementById('eyeContrasenaRep');
      
      if(contrasenaRep.type == "password"){
        contrasenaRep.type = "text";
        eyeContrasenaRep.style.opacity=0.8;
      }
      else{
        contrasenaRep.type = "password";
        eyeContrasenaRep.style.opacity=0.4;
      }
    }

}
