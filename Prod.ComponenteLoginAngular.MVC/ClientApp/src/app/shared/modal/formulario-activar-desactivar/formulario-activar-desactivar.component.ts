import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {AdministrarUsuarioService}from '../../../../app/services/administrarUsuario';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-formulario-activar-desactivar',
  templateUrl: './formulario-activar-desactivar.component.html',
  styleUrls: ['./formulario-activar-desactivar.component.css']
})
export class FormularioActivarDesactivarComponent implements OnInit {
  form: FormGroup;
  nro_documento: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  estado_act_desac: boolean = false;
  idUsuario: number = 0;
  id_persona: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private administrarUsuarioService : AdministrarUsuarioService,
    private _alertService: AlertService,
    private route: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) 
    {
      this.nro_documento = data.nro_documento;
      this.estado_act_desac = data.estado_act_desac;
      this.idUsuario = data.idUsuario;
    }
  ngOnInit(): void {
    this.ObtenerPersonaPorRepresentanteLegal();
  }

  ObtenerPersonaPorRepresentanteLegal = () =>{
    let data = {
      NroDocumento : this.nro_documento
    }
    this.administrarUsuarioService.ObtenerPersonaPorRepresentanteLegal(data)
    .then(resp => {
      if(resp.success){
      this.nombres = resp.data.nombres;
      this.apellidos = resp.data.apellidos;
      this.correo = resp.data.email;
      this.telefono = resp.data.celular;
      this.id_persona = resp.data.id_persona;
      }
    })
    .catch(err =>[]);
  }

  CambiarEstadoActDesact = () =>{
    var modelo = {
      id_persona: this.id_persona,             
      correo: this.correo,
      telefono: this.telefono,
      NumeroDocumento: this.nro_documento,
      id_contacto_extranet: this.idUsuario,
      activo: this.estado_act_desac
    };
    this.spinner.show();
    this.administrarUsuarioService.CambiarEstadoUsuarioPorRepresentanteLegal(modelo)
    .then(resp => {
      this.spinner.hide();
      if(resp.success){
        this._alertService.alertOk(resp.messages[0],"",
        () => {
          this.dialog.closeAll();
      });
      }
      else{
        this._alertService.alertError(resp.messages[0]);
      }
    })
    .catch(err =>[]);
  }
}
