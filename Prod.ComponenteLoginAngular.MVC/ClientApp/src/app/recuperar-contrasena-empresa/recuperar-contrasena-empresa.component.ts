import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena-empresa',
  templateUrl: './recuperar-contrasena-empresa.component.html',
  styleUrls: ['./recuperar-contrasena-empresa.component.css']
})
export class RecuperarContrasenaEmpresaComponent implements OnInit {
  validateForm: FormGroup;

  numeroDocumento : string = null;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }
  ngOnInit(): void {
  }

  
  fnBtnRecuperarContrasena = () => {
    let Data = {
      numeroDocumento: this.numeroDocumento,
    }
    
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
    }, error => console.error(error));
   }

}
