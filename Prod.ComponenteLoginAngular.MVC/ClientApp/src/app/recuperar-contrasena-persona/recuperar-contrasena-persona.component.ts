import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  

  fnBtnRecuperarContrasena = () => {
    this.changeNroDocumento();
    this.changeEmail();

    if(!this.validarNroDocumento && !this.validarEmail){
      this.spinner.show();
      let Data = {
        numeroDocumento: this.numeroDocumento,
        email: this.email
      }
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
        this.spinner.hide();
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
