import { Component, OnInit } from '@angular/core';
import { ComunService } from 'src/app/services/comun.service';
import {usuarioDomicilioModel} from 'src/app/interfaces/models/solicitudModel';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-actualizar-datos-notif-fisica',
  templateUrl: './actualizar-datos-notif-fisica.component.html'
})
export class ActualizarDatosNotifFisicaComponent implements OnInit {
  user = new usuarioDomicilioModel;
  listaDepartamentos: Array<any>;
  listaProvincias: Array<any>;
  listaDistritos: Array<any>;
  departamentoSeleccionado: string;
  provinciaSeleccionado: string;
  distritoSeleccionado: string;
  formRegistroPersona: FormGroup;
  departamento: string;
  provincia: string;
  distrito: string;
  constructor( private comunService: ComunService,
    public dialog: MatDialog,
    private ubigeoService: UbigeoService,
    private _alertService: AlertService) { 
     
    }

  
  ngOnInit(): void {
    this.fnCargaDepartamentos();
    this.ObtenerDatosUsuarioDomicilio();
  }

  
    ObtenerDatosUsuarioDomicilio = ()=> {
    this.comunService.ObtenerDatosUsuarioDomicilio()
      .then(async resp => {
        if(resp.success){
          this.user = resp.data;
          this.departamento = this.user.codigo_departamento;
          this.provincia = this.user.codigo_provincia;
          this.distrito = this.user.codigo_distrito;
          await this.fnCargaProvincias(this.user.codigo_departamento);
          await this.fnCargaDistritos(this.user.codigo_departamento + this.user.codigo_provincia);
        }
      })
      .catch(err => []);
  }

  habilitar = () =>{
    this.comunService.ActivarCasilla()
      .then(resp => {
        if(resp.success){
          this._alertService.open("success",(`La casilla electrónica se habilitó correctamente`));
          this.dialog.closeAll();
        }
        else{
          this._alertService.open("warning",(`No se pudo habilitar su casilla electrónica`));
        }
      })
      .catch(err => []);

    
  }

  darDeBaja = () =>{
    var tiene_mensaje = 0;
    var mensajes = "";
    if(this.user.codigo_departamento == undefined || this.user.codigo_departamento == "0")
    {
      mensajes += "<li>Debe ingresar el departamento.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }
   
    if(this.user.codigo_provincia == undefined || this.user.codigo_provincia == "0")
    {
      mensajes += "<li>Debe ingresar la provincia.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }
   
    if(this.user.codigo_distrito == undefined || this.user.codigo_distrito == "0")
    {
      mensajes += "<li>Debe ingresar el distrito.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }

    if(this.user.direccion == undefined || this.user.direccion == "")
    {
      mensajes += "<li>Debe ingresar el dirección.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }
   

    if(tiene_mensaje > 0)
    {
      this._alertService.alertWarning("<ul style='list-style:none !important; padding:0px !important; font-size: 13px !important;'>"+mensajes+"</ul>","");
      return
    }



    var obj = {
      codigo_departamento : this.user.codigo_departamento,
      codigo_provincia : this.user.codigo_provincia.substring(2,4),
      codigo_distrito : this.user.codigo_distrito.substring(4,6),
      direccion: this.user.direccion
    }
    this.comunService.DesactivarCasilla(obj)
      .then(resp => {
        if(resp.success){
          this._alertService.open("success",(`La casilla electrónica se deshabilitó correctamente`));
          this.dialog.closeAll();
        }
        else{
          this._alertService.open("warning",(`No se pudo deshabilitar su casilla electrónica`));
        }
      })
      .catch(err => []);
  }
  

  fnCargaDepartamentos = () =>{
    this.ubigeoService.ObtenerDepartamentos()
        .then(resp => {
          if (resp) {
            this.listaDepartamentos = resp.data;
          }
          else {
           
          }
        })
        .catch(err => []);
    }

    fnCargaProvincias = (value : any) =>{
        this.ubigeoService.ObtenerProvincias(
            value
        )
            .then(resp => {
              if (resp) {
                this.listaProvincias = resp.data;
                this.user.codigo_provincia = this.departamento + this.provincia;
              }
              else {
               
              }
            })
            .catch(err => []);
        }

    fnCargaDistritos = (value : any) =>{
        this.ubigeoService.ObtenerDistritos(
            value
        )
            .then(resp => {
                if (resp) {
                this.listaDistritos = resp.data;
                this.user.codigo_distrito = this.departamento + this.provincia + this.distrito;
                }
                else {
                
                }
            })
            .catch(err => []);
        }


    fnCargaProvincias2 = (value : any) =>{
          this.ubigeoService.ObtenerProvincias(
              value
          )
              .then(resp => {
                if (resp) {
                  this.listaProvincias = resp.data;
                }
                else {
                 
                }
              })
              .catch(err => []);
          }
  
     fnCargaDistritos2 = (value : any) =>{
          this.ubigeoService.ObtenerDistritos(
              value
          )
              .then(resp => {
                  if (resp) {
                  this.listaDistritos = resp.data;
                  }
                  else {
                  
                  }
              })
              .catch(err => []);
          }
  

    fnChangeDepartamento = () =>{
      this.user.codigo_provincia = null;
      this.user.codigo_distrito = null;
      this.listaProvincias = null;
      this.listaDistritos = null;
      this.fnCargaProvincias2(this.user.codigo_departamento);
    }

    fnChangeProvincia = () =>{
      this.fnCargaDistritos2(this.user.codigo_provincia);
    }
}
