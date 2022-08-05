import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { enumerados } from 'src/app/enums/enumerados';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cambiar-contrasena-empresa',
  templateUrl: './cambiar-contrasena-empresa.component.html',
  styleUrls: ['./cambiar-contrasena-empresa.component.css']
})
export class CambiarContrasenaEmpresaComponent implements OnInit {

  id_aplicacion : number = 0;
  contrasenaActual: string = null;
  contrasenaNueva: string = null;
  contrasenaRep: string = null;
  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  validaSuccess : boolean = false;
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
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id_aplicacion = params['id_aplicacion'] || null;
      this.obtenerImagenByAplicacion();
    });
  }

  obtenerImagenByAplicacion = () =>{
    let Data = {
      id_aplicacion: Number(this.id_aplicacion) 
    }

    this.componenteLoginService.obtenerImagenByAplicacion(Data)
      .then(resp => {
        var binary = atob(resp.data.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var e = 0; e < len; e++) {
          view[e] = binary.charCodeAt(e);
        }
        var blob = new Blob([view], { type: this.contentType });
        var urlArchivo = URL.createObjectURL(blob);
        this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
      })
      .catch(err => []);
  }
  

  cambiarContrasena = () => 
  {
    this.changeContrasenaNueva();
    this.changeContrasenaRep();

    if(!this.validadorContrasenaNueva && !this.validadorContrasenaRep && !this.validadorContrasenaRepetir && !this.validadorRequisitosContrasenaNueva){
    this._alertService.alertConfirm(
     "",
     "¿Está seguro que desea cambiar la contraseña?",
     () => {
    this.spinner.show();
    let Data = {
      id: "2496752",  //this.id,
      dni: "753470004", // this.userName,
      email: "JHOSEPH264@GMAIL.COM",// this.email,
      clave: "produce", //this.form.get('contrasena').value,
    }
     this.componenteLoginService.CambiarContrasena(Data)
      .then(resp => {
       this.spinner.hide();
       if (resp.success) {
          this.isVisiblePaso2 = false;
          this.validaSuccess = true;
       }
       else {
        debugger;
         this._alertService.alertError("Error al actualizar contraseña");
       }
     })
     .catch(err => []);
   });
   }
 }

  clickPaso2 = () =>{
    this.changeContrasenaActual();
 
      if(!this.validadorContrasenaActual){
        this.isVisiblePaso1 = false;
        this.isVisiblePaso2 = true;
        //this.isVisiblePaso3 = false;
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
