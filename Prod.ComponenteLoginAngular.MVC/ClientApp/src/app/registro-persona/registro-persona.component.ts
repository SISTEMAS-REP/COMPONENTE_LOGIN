import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

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
  tengoRuc: boolean = false;

  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;

  //Varibles validador
  validadorRuc :  boolean = true;
  validadorTipoDocumento :  boolean = true;
  validadorNroDocumento :  boolean = true;
  validadorApellidos :  boolean = true;
  validadorNombres :  boolean = true;
  validadorCelular :  boolean = true;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit() {
    //this.registroPersonaService();
  }

  registroPersonaService = () =>{
    if(!this.validadorRuc){
      return;
    }


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
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/RegistroPersona', formData).subscribe(result => {
    }, error => console.error(error));
  }

  changeTipoDocumento = (item) =>
  {   
    if(this.tipoDoc == 0){
      this.validadorTipoDocumento = true;
    }
    else{
      this.validadorTipoDocumento = false;
    }
  }

  changeTengoRuc= (item) =>
  {
    this.tengoRuc;
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
  }
  clickPaso2 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = true;
  }





  //validador

  changeRuc = (item) =>{
    if(this.ruc.length == 0){
      this.validadorRuc = true;
    }
    else{
      this.validadorRuc = false;
    }
  } 

  changeNroDocumento = (item) =>{
    if(this.numeroDoc.length == 0){
      this.validadorNroDocumento = true;
    }
    else{
      this.validadorNroDocumento = false;
    }
  }
  
  changeApeliidos = (item) =>{
    if(this.apellidos.length == 0){
      this.validadorApellidos = true;
    }
    else{
      this.validadorApellidos = false;
    }
  }

  changeNombres = (item) =>{
    if(this.nombres.length == 0){
      this.validadorNombres = true;
    }
    else{
      this.validadorNombres = false;
    }
  }
  

  changeCelular = (item) =>{
    if(this.celular.length == 0){
      this.validadorCelular = true;
    }
    else{
      this.validadorCelular = false;
    }
  }

}
