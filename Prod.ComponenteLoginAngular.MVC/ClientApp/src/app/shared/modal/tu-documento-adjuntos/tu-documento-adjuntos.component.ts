import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { enumerados } from 'src/app/enums/enumerados';
import { DocumentoAdjuntoService } from 'src/app/services/documentoAdjunto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tu-documento-adjuntos',
  templateUrl: './tu-documento-adjuntos.component.html',
  styleUrls: ['./tu-documento-adjuntos.component.css']
})
export class TuDocumentoAdjuntosComponent implements OnInit {
  title = "";
  message: any = "¿Desea guardar la información?";
  idSolicitud: 0;
  enumerado: enumerados = new enumerados();
  listaAdjuntos: Array<any>;
  page: number;
  cEntries: number;
  pageSize: number;
  paginatorSize: number = 5;
  lastPage: number;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer, private documentoAdjuntoService: DocumentoAdjuntoService) {
    // if (data.title && data.title.trim() != "") {
    //   this.title = data.title;
    // }
    // if (data.message && data.message.trim() != "") {
    //   this.message = this.sanitizer.bypassSecurityTrustHtml(data.message);
    // }
    this.title = data.title;
    this.idSolicitud = data.idSolicitud;
  }

  ngOnInit(): void {
    this.lastPage = 1;
    this.fnListarDocumentosAdjuntos();
  }

  fnListarDocumentosAdjuntos = () => {
    this.page = 1;
    this.pageSize = 5;
    this.listaAdjuntos = [];
    this.documentoAdjuntoService.documentoAdjuntoListar({
      IdSolicitud: this.idSolicitud,
      Page: this.page,
      PageSize: this.pageSize
    })
      .then(resp => {
        this.listaAdjuntos = resp.data;
        this.lastPage = 1;
        if (this.listaAdjuntos.length > 0) {
          this.fnPaginar();
        }
      })
      .catch(err => []);
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
        this.page = this.page < Math.floor(this.cEntries / this.pageSize) ? this.page + 1 : Math.floor(this.cEntries / this.pageSize);
        break;
      case 4:
        this.page = Math.floor(this.cEntries / this.pageSize);
        break;
      default:
        break;
    }
    this.documentoAdjuntoService.documentoAdjuntoListar({
      IdSolicitud: this.idSolicitud,
      Page: this.page,
      PageSize: this.pageSize
    })
      .then(resp => {
        this.listaAdjuntos = resp.data;
        this.lastPage = 1;
        if (this.listaAdjuntos.length > 0) {
          this.fnPaginar();
        }
      })
      .catch(err => []);
  }

  fnPaginar = () => {
    var obj = this.listaAdjuntos[0];
    this.cEntries = obj.totalRows;
    let indexLastPage = Math.floor(this.cEntries / this.pageSize);
    if (this.cEntries % this.pageSize == 0) indexLastPage--;
    let indexLastRange = Math.floor(this.cEntries / (this.paginatorSize * this.pageSize));
    if (this.cEntries % (this.paginatorSize * this.pageSize) == 0) indexLastRange--;
    var start = this.page * this.paginatorSize;
    var end = start + this.paginatorSize;
    this.lastPage = indexLastPage;
  }

  fnDescargarArchivo = (event, row) => {
    if (row.codigoGA != '0') {
      var a = document.createElement('a');
      a.download = row.nombreArchivo;
      a.href = environment.apiUrl + '/comun/verPdf?codFile=' + row.codigoGA;
      a.target = '_blank';
      document.body.append(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  fnSafeHTML = (text) => {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
