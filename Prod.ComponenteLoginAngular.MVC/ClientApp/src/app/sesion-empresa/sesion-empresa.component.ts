import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion-empresa',
  templateUrl: './sesion-empresa.component.html',
  styleUrls: ['./sesion-empresa.component.css']
})
export class SesionEmpresaComponent implements OnInit {

  numero_documento : string = null;
  contrasena : string = null;
  ruc: string = null;

  validarRuc : boolean = false;
  validarNroDocumento: boolean = false;
  validarContrasena: boolean = false;

   constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }
  ngOnInit(): void {
  }

  iniciarSesionPersonaJuridica = () =>{
    this.changeRuc();
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validarRuc && !this.validarNroDocumento && !this.validarContrasena){
      let Data = {
        dni: this.numero_documento,
        clave: this.contrasena,
        ruc: this.ruc
      }
  
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/IniciarSesionExtranet', formData).subscribe(result => {
      }, error => console.error(error));
    }    
  }

  changeRuc = () =>{
    if(this.ruc == null || this.ruc == ""){
      this.validarRuc = true;
    }
    else{
      if(this.ruc.length < 11){
        this.validarRuc = true;
      }
      else{
        this.validarRuc = false;
      }
     
    }
  }
  
  changeNroDocumento = () =>{
    if(this.numero_documento == null || this.numero_documento == ""){
      this.validarNroDocumento = true;
    }
    else{
      this.validarNroDocumento = false;
    }
  }

  changeContrasena = () =>{
    if(this.contrasena == null || this.contrasena == ""){
      this.validarContrasena = true;
    }
    else{
      this.validarContrasena = false;
    }
  }

}
