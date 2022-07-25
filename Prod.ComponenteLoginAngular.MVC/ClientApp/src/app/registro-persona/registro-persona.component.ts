import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.registroPersonaService();
  }

  registroPersonaService = () =>{
    debugger
    let Data = {
      Id: 0,
      IdSector: 2,
      IdTipoPersona: 1,
      CodigoDepartamento: "01",
      CodigoProvincia: "01",
      CodigoDistrito: "01",
      IdTipoIdentificacion: 1,
      RazonSocial: "LEONARDO DOMINGO",
      Nombres: "LEONARDO DOMINGO RODRIGUEZ GIRON",
      Apellidos: "RODRIGUEZ GIRON",
      NroDocumento: "75128101",
      Direccion: "LA PAZ",
      Celular: "999999998",
      Email: "luz.angela@gmail.com",
      Flag: "A",
      NroDocPerNatural: "75128101",
      Contrasena: "produce"
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/RegistroPersona', formData).subscribe(result => {
      debugger;
    }, error => console.error(error));
  }

  // registroPersonaService = () =>{
  //   debugger
  //    this.http.post(this.baseUrl + 'ComponenteLogin/RegistroPersona', null)
  //    .pipe(
  //      map((response) => {
  //       debugger
  //      }),
  //      catchError((error) => {
  //        return throwError(error);
  //      })
  //    );
  //  }

}
