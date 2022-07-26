import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {
  ruc: string = null;
  tipoDoc: number = null;
  numeroDoc: string = null;
  apellidos: string = null;
  nombres: string = null;
  celular: string = null;
  correo: string = null;
  contrasena: string = null;
  rep_contrasena: string = null;

  validateForm: FormGroup;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  private fb: FormBuilder,
  ) { 
    this.configuracionFormularioValidacion();
  }

  ngOnInit() {
    //this.registroPersonaService();
  }

  configuracionFormularioValidacion = (): void => {
    debugger;
    this.validateForm = this.fb.group({
      ruc: [null, [Validators.required]],
      tipoDoc: [null, [Validators.required]],
      numeroDoc: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      contrasena: [null, [Validators.required]],
      rep_contrasena: [null, [Validators.required]]

    });
  };

  isFormValid = (): boolean => {   
    debugger; 
    this.submitForm();
    return this.validateForm.valid;
  };

  submitForm = () => {
    debugger;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  };

  registroPersona = () => {
    debugger;
    if (this.isFormValid()) {
      this.registroPersonaService();
    }    
  };

  registroPersonaService = () =>{
    let Data = {
      Id: 0,
      IdSector: 2,
      IdTipoPersona: 1,
      CodigoDepartamento: "01",
      CodigoProvincia: "01",
      CodigoDistrito: "01",
      IdTipoIdentificacion: 1,
      RazonSocial: "RazonSocial",
      Nombres: this.nombres,
      Apellidos: this.apellidos,
      NroDocumento: this.numeroDoc,
      Direccion: "Direccion",
      Celular: this.celular,
      Email: this.correo,
      Flag: "A",
      NroDocPerNatural: this.numeroDoc,
      Contrasena: this.contrasena
    }
    debugger;
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
