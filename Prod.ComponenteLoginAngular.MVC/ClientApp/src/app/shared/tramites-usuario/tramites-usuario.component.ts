import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enumerados } from 'src/app/enums/enumerados';
import { solicitudModel } from 'src/app/interfaces/models/solicitudModel';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TuDocumentoAdjuntosComponent } from '../modal/tu-documento-adjuntos/tu-documento-adjuntos.component';
import { TuFlujoComponent } from '../modal/tu-flujo/tu-flujo.component';
import { TuVerPdfComponent } from '../modal/tu-ver-pdf/tu-ver-pdf.component';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { FormularioAdjuntarObservacionComponent } from 'src/app/shared/modal/formulario-adjuntar-observacion/formulario-adjuntar-observacion.component';

@Component({
  selector: 'app-tramites-usuario',
  templateUrl: './tramites-usuario.component.html',
  // styleUrls: ['./tramites-usuario.component.css']
})
export class TramitesUsuarioComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  form = new solicitudModel();
  listaSolicitudes: Array<any>;
  page: number;
  cEntries: number;
  pageSize: number;
  paginatorSize: number = 5;
  lastPage: number;
  isAuth = false;



  constructor(elm: ElementRef,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.page = 1;
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
  }

  ngOnInit(): void {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
    this.form.idEstadoSolicitud = 0;
    this.form.fechaInicio = startOfMonth;
    this.form.fechaFin = endOfMonth;
    this.lastPage = 1;
    this.fnSolitiudListar();
  }

  fnAbrirModalAdjuntosObservaciones = (item) =>{
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "60%",
      data: { 
        dependenciaSeleccionada : item.dependencia,
        idSolicitud: item.idSolicitud,
        numTramDocumentario: item.numTramDocumentario,
        idDocumento: item.idDocumento,
        codDep: item.codDep
      },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(FormularioAdjuntarObservacionComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.fnSolitiudListar();
    });
  }

  fnBtnPaginado = (paginado, pageSize = 5) => {
    this.pageSize = pageSize;
    switch (paginado) {
      case 1:
        this.page = 1;
        break;
      case 2:
        this.page = this.page > 1 ? this.page - 1 : 1;
        break;
      case 3:
        this.page = this.page < Math.round(this.cEntries / this.pageSize) ? this.page + 1 : Math.round(this.cEntries / this.pageSize);
        break;
      case 4:
        this.page = Math.round(this.cEntries / this.pageSize);
        break;
      default:
        break;
    }
    this.solicitudService.solicitudListar({
      IdEstadoSolicitud: this.form.idEstadoSolicitud,
      // IdPersona: 2293346,
      FechaInicio: this.form.fechaInicio,
      FechaFin: this.form.fechaFin,
      Page: this.page,
      PageSize: pageSize
    })
      .then(resp => {
        this.listaSolicitudes = resp.data;
        this.lastPage = 1;
        if (this.listaSolicitudes.length > 0) {
          this.fnPaginar();
        }
      })
      .catch(err => []);
  }

  fnSolitiudListar = () => {
    this.page = 1;
    this.pageSize = 5;
    this.solicitudService.solicitudListar({
      IdEstadoSolicitud: this.form.idEstadoSolicitud,
      // IdPersona: 2293346,
      FechaInicio: this.form.fechaInicio,
      FechaFin: this.form.fechaFin,
      Page: this.page,
      PageSize: this.pageSize,
    })
      .then(resp => {
        this.listaSolicitudes = resp.data;
        this.lastPage = 1;
        if (this.listaSolicitudes.length > 0) {
          this.fnPaginar();
        }
      })
      .catch(err => []);
  }

  fnPaginar = () => {
    var obj = this.listaSolicitudes[0];
    this.cEntries = obj.totalRows;
    let indexLastPage = Math.round(this.cEntries / this.pageSize);
    // if (this.cEntries % this.pageSize > 0) indexLastPage++;
    let indexLastRange = Math.round(this.cEntries / (this.paginatorSize * this.pageSize));
    if (this.cEntries % (this.paginatorSize * this.pageSize) == 0) indexLastRange--;
    var start = this.page * this.paginatorSize;
    var end = start + this.paginatorSize;
    this.lastPage = indexLastPage;
  }

  fnSafeHTML = (text) => {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  fnAbrirDetalle = (e, row) => {
    row.title = 'Detalle de la solicitud';
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "80%",
      data: row,
      disableClose: true,
    }
    const dialogRef = this.dialog.open(TuDocumentoAdjuntosComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (JSON.parse(result)) {
        console.log("Cerrado")
      }
    });
  }

  fnAbrirFlujo = (e, row) => {
    row.title = 'Flujo Documentario';
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "80%",
      data: row,
      disableClose: true,
    }
    const dialogRef = this.dialog.open(TuFlujoComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (JSON.parse(result)) {
        console.log("Cerrado")
      }
    });
  }

  fnVerPDF = (e, row) => {
    if (row.codigoGA != '0') {
      var a = document.createElement('a');
      // a.download = row.codigoGA + '.pdf';
      a.href = environment.apiUrl + '/comun/verPdf?codFile=' + row.codigoGA;
      a.target = '_blank';
      document.body.append(a);
      a.click();
      document.body.removeChild(a);
    }
    // row.title = 'Visualizar Solicitud';
    // let config: MatDialogConfig = {
    //   panelClass: "dialog-responsive",
    //   width: "80%",
    //   data: row,
    //   disableClose: true,
    // }
    // const dialogRef = this.dialog.open(TuVerPdfComponent, config);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (JSON.parse(result)) {
    //     console.log("Cerrado")
    //   }
    // });
  }

}
function TuVerPdf(TuVerPdf: any, config: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

