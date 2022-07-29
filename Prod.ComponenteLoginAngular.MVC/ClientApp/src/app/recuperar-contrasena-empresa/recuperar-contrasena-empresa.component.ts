import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasena-empresa',
  templateUrl: './recuperar-contrasena-empresa.component.html',
  styleUrls: ['./recuperar-contrasena-empresa.component.css']
})
export class RecuperarContrasenaEmpresaComponent implements OnInit {

  numeroDocumento : string = null;
  validarRuc : boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }
  ngOnInit(): void {
  }

  
  fnBtnRecuperarContrasena = () => {
    this.changeRuc();
    if(!this.validarRuc)
    {
      let Data = {
        numeroDocumento: this.numeroDocumento,
      }
      
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
      }, error => console.error(error));
    }
    
   }

   changeRuc = () =>{
    if(this.numeroDocumento == null || this.numeroDocumento == ""){
      this.validarRuc = true;
    }
    else{
      if(this.numeroDocumento.length < 11){
        this.validarRuc = true;
      }
      else{
        this.validarRuc = false;
      }
     
    }
  }

}
