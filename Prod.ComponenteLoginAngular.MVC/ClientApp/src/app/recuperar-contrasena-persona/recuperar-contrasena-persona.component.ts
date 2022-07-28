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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  

  fnBtnRecuperarContrasena = () => {
    let Data = {
      numeroDocumento: this.numeroDocumento,
      email: this.email
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
    }, error => console.error(error));
   }

}
