import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { enumerados } from 'src/app/enums/enumerados';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificacion-detalle',
  templateUrl: './notificacion-detalle.component.html',
  styleUrls: ['./notificacion-detalle.component.css']
})
export class NotificacionDetalleComponent implements OnInit {
  title = "";
  message: any = "¿Desea guardar la información?";
  id_notificacion: 0;
  enumerado: enumerados = new enumerados();
  listaAdjuntos: Array<any>;
  page: number = 1;
  cEntries: number;
  pageSize: number;
  paginatorSize: number = 5;
  lastPage: number;
  notificacion$: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificacionService: NotificacionService,
    )
    
    {

    this.id_notificacion = data.id_notificacion;
  }

  ngOnInit(): void {
    this.notificacion$ = this.data;
    this.fnListarDocumentosAdjuntos();
  }

   fnListarDocumentosAdjuntos = () => {
     this.page = 1;
     this.pageSize = 5;
     this.listaAdjuntos = [];
    this.notificacionService.notificacionListarDocumentoAdjunto({
      id_notificacion: this.id_notificacion,
      Page: this.page,
      PageSize: this.pageSize
    })
      .then(resp => {
        this.listaAdjuntos = resp.data;
      })
      .catch(err => []);
   }


  fnDescargarArchivo = (event, item) => {
       var a = document.createElement('a');
       a.download = 'adjunto.pdf';
       a.href = `/Notificacion/VerDocumentoAdjunto?id_notificacion=` + item.id_notificacion+`&id_adjunto=` + item.id_adjunto;
       a.target = '_blank';
       document.body.append(a);
       a.click();
       document.body.removeChild(a);

  }

  fnDescargarArchivoCargo = (event, item) => {
       var a = document.createElement('a');
       a.download = 'adjunto.pdf';
       a.href = `/Notificacion/VerDocumentoAdjuntoNotificacion?id_notificacion=` + item.id_notificacion+`&id_adjunto=` + item.id_adjunto;
       a.target = '_blank';
       document.body.append(a);
       a.click();
       document.body.removeChild(a);

  }


}
