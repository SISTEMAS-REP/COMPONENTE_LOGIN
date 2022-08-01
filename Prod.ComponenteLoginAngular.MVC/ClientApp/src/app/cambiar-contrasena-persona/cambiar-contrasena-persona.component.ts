import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-cambiar-contrasena-persona',
  templateUrl: './cambiar-contrasena-persona.component.html',
  styleUrls: ['./cambiar-contrasena-persona.component.css']
})
export class CambiarContrasenaPersonaComponent implements OnInit {
  contrasenaActual: string = null;
  contrasenaNueva: string = null;
  contrasenaRep: string = null;


  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  isVisiblePaso3 : boolean = false;

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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
  ) {
  }
  

  ngOnInit() {
  }

  cambiarContrasena = () => 
  {
    let Data = {
      id: "2496752",  //this.id,
      dni: "753470004", // this.userName,
      email: "JHOSEPH264@GMAIL.COM",// this.email,
      clave: "produce", //this.form.get('contrasena').value,
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/CambiarContrasena', formData).subscribe((result : any) => {

     if(result.success){
       alert("Se actualizó la contraseña");
     }
     else{
       alert(result.messages[0]);
     }
     
   }, error => console.error(error));
  }

  clickPaso2 = () =>{
    this.changeContrasenaActual();
 
      if(!this.validadorContrasenaActual){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = true;
        //this.isVisiblePaso3 = false;
      }       
  }

  clickPaso3 = () =>{
    this.changeContrasenaNueva();
    this.changeContrasenaRep();
 
      if(!this.validadorContrasenaNueva && !this.validadorContrasenaRep && !this.validadorContrasenaRepetir && !this.validadorRequisitosContrasenaNueva){
        //this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = false;
        this.isVisiblePaso3 = true;
      }    
  }

  changeContrasenaActual = () =>{
      if(this.contrasenaActual == null || this.contrasenaActual == ""){
        this.validadorContrasenaActual = true;
      }
      else{
        this.validadorContrasenaActual = false;
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
      if(this.contrasenaRep == null || this.contrasenaRep == ""){
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

