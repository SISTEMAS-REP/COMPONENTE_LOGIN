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
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  iniciarSesionPersonaNatural = () =>{
    let Data = {
      dni: this.numero_documento,
      clave: this.contrasena
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/IniciarSesionExtranet', formData).subscribe(result => {
    }, error => console.error(error));
  }

}
