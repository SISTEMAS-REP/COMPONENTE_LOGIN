import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion-persona',
  templateUrl: './sesion-persona.component.html',
  styleUrls: ['./sesion-persona.component.css']
})
export class SesionPersonaComponent implements OnInit {

  numero_documento : string = null;
  contrasena : string = null;

  validarNroDocumento: boolean = false;
  validarContrasena: boolean = false;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  iniciarSesionPersonaNatural = () =>{
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validarNroDocumento && !this.validarContrasena){
      let Data = {
        dni: this.numero_documento,
        clave: this.contrasena
      }
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/IniciarSesionExtranet', formData).subscribe(result => {
      }, error => console.error(error));
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
