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
      Id : 1
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
