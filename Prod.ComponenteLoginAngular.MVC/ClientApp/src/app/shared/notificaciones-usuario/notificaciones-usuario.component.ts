import { Component, OnInit } from '@angular/core';
import { enumerados } from 'src/app/enums/enumerados';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionDetalleComponent } from 'src/app/shared/modal/notificacion-detalle/notificacion-detalle.component';
import { ComunService } from 'src/app/services/comun.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { notificacionFilterModel } from 'src/app/interfaces/models/notificacionFilterModel';

@Component({
  selector: 'app-notificaciones-usuario',
  templateUrl: './notificaciones-usuario.component.html',
  // styleUrls: ['./notificaciones-usuario.component.css']
})
export class NotificacionesUsuarioComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  textoConsulta: string = '';
  listaNotificaciones: Array<any>;
  formFilter = new notificacionFilterModel();
  page: number;
  pageSize: number;
  id_persona: number;
  id_estado: number;
  paginatorSize: number = 10;
  lastPage: number;
  isAuth = false;
  constructor(    
    private notificacionService: NotificacionService,
    private comunService: ComunService,
    public dialog: MatDialog,
  ) {
    this.page = 1;
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
    } 

  ngOnInit(): void {
    this.fnLimpiarFormFilter();
    this.fnBtnNotificacionListar();
  }

    fnLimpiarFormFilter=()=>{
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
      this.formFilter.id_estado = 0;
      this.formFilter.fechaInicio = startOfMonth;
      this.formFilter.fechaFin = endOfMonth;
      this.formFilter.asunto = null;
    }

  fnBuscarLimpiar=()=>{
    this.fnLimpiarFormFilter();
    this.fnBtnNotificacionListar();
  }

  fnValidateFormFilter = () =>{
    // var fecha_inicio = null;
    // if(this.formFilter.fechaInicio.length > 8){
    //   fecha_inicio = this.formFilter.fechaInicio;  
    // }
    // console.log(this.formFilter.fechaInicio);
        // alertWarning(text: string, callBack?: any): boolean {
          if(this.formFilter.fechaInicio > this.formFilter.fechaFin){
            let mensaje = "La fecha de inicio debe ser menor a la fecha fin.";
          Swal.fire({
            title: 'Alerta',
            html: mensaje,
            type: 'warning',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Ok',
          }).then((value) => {
            // if (callBack)
            //   callBack();
          });
          return false;
        // }
      }
  }

  fnBtnNotificacionListar = () => {

    this.page = 1;
    this.pageSize = 10;
    this.id_persona = 0;

    this.listaNotificaciones = [];
    this.fnValidateFormFilter();

      this.comunService.obtenerDatosUsuario()
        .then(resp => {
          this.id_persona = resp.data.id;
          this.notificacionService.notificacionListarPorUsuario({
            id_persona: this.id_persona,
            id_estado: this.formFilter.id_estado,
            asunto: this.formFilter.asunto,
            fecha_inicio: this.formFilter.fechaInicio,
            fecha_fin: this.formFilter.fechaFin,
            Page: this.page,
            PageSize: this.pageSize
          })
            .then(respNot => {
              this.listaNotificaciones = respNot.data;
            })
            .catch(err => []);
        })
        .catch(err => []);

  };

  fnVerDatosNotificacion(item){

    if(item.id_estado == 2){
      this.notificacionService.notificacionActualizarEstado({id_notificacion : item.id_notificacion});
    }
    const dialogoNotificacion = this.dialog.open(NotificacionDetalleComponent, {
      data: item,
      width: '55%',
       height: 'auto',
      // height: '90vh',
      disableClose: true
    });

    dialogoNotificacion.afterClosed().subscribe(art => {
      this.fnBtnNotificacionListar();
      // this.loadPage();
    });
  }

}
