import { Component, OnInit } from '@angular/core';
import { AdministrarUsuarioService } from 'src/app/services/administrarUsuario';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormularioActivarDesactivarComponent } from 'src/app/shared/modal/formulario-activar-desactivar/formulario-activar-desactivar.component';
import { FormularioNuevoUsuarioComponent } from 'src/app/shared/modal/formulario-nuevo-usuario/formulario-nuevo-usuario.component';

@Component({
  selector: 'app-administrar-usuario-repre',
  templateUrl: './administrar-usuario-repre.component.html',
  styleUrls: ['./administrar-usuario-repre.component.css']
})
export class AdministrarUsuarioRepreComponent implements OnInit {
  listaUsuariosAsignados: Array<any>;
  constructor(private administrarUsuarioService: AdministrarUsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.Listar_usuarios_representante_legal();
  }

  Listar_usuarios_representante_legal = () =>{
    this.administrarUsuarioService.Listar_usuarios_representante_legal()
      .then(resp => {
        this.listaUsuariosAsignados = resp.data;
      })
      .catch(err => []);
  }

  
  handleClickNuevo = ()=>{
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: { },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(FormularioNuevoUsuarioComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.Listar_usuarios_representante_legal();
    });
  }

  handleClickEditar = (app)=>{
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: {
        idUsuario: app.idUsuario,
        nro_documento: app.numeroDocumento,
        estado_act_desac: app.activo
      },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(FormularioActivarDesactivarComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.Listar_usuarios_representante_legal();
    });
  }

}
