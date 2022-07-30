import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasena-persona',
  templateUrl: './recuperar-contrasena-persona.component.html',
  styleUrls: ['./recuperar-contrasena-persona.component.css']
})
export class RecuperarContrasenaPersonaComponent implements OnInit {
  numeroDocumento: string = null;
  email: string = null;

  validarNroDocumento: boolean = false;
  validarEmail: boolean = false;

  validaSuccess: boolean = false;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  

  fnBtnRecuperarContrasena = () => {
    this.changeNroDocumento();
    this.changeEmail();

    if(!this.validarNroDocumento && !this.validarEmail){
      let Data = {
        numeroDocumento: this.numeroDocumento,
        email: this.email
      }
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
        this.validaSuccess = true;
      }, error => console.error(error));
    }   
   }


   changeNroDocumento = () =>{
    if(this.numeroDocumento == null || this.numeroDocumento == ""){
      this.validarNroDocumento = true;
    }
    else{
      this.validarNroDocumento = false;
    }
  }

  changeEmail = () =>{
    if(this.email == null || this.email == ""){
      this.validarEmail = true;
    }
    else{
      this.validarEmail = false;
    }
  }

}
