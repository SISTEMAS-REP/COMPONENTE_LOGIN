import { Component, OnInit } from '@angular/core';
import { ComunService } from 'src/app/services/comun.service';
import {usuarioDomicilioModel} from 'src/app/interfaces/models/solicitudModel';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
@Component({
  selector: 'app-habi-desa-domicilio',
  templateUrl: './habi-desa-domicilio.component.html'
})
export class HabiDesaDomicilioComponent implements OnInit {

  user = new usuarioDomicilioModel;
  constructor(
    private comunService: ComunService,
    public dialog: MatDialog,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.ObtenerDatosUsuarioDomicilio()
  }

  ObtenerDatosUsuarioDomicilio = () => {
    this.comunService.ObtenerDatosUsuarioDomicilio()
      .then(resp => {
        if(resp.success){
          this.user = resp.data;
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
    this.comunService.DesactivarCasilla(null)
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
}
