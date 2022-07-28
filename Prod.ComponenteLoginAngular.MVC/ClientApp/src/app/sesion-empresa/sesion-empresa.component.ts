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

   constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }
  ngOnInit(): void {
  }

  iniciarSesionPersonaJuridica = () =>{
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
