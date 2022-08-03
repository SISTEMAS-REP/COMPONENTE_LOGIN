import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tu-ver-pdf',
  templateUrl: './tu-ver-pdf.component.html',
  styleUrls: ['./tu-ver-pdf.component.css']
})
export class TuVerPdfComponent implements OnInit {
  title: string;
  baseUrl = `/comun/verPdf?codFile=`;
  codigoGA: string;
  ruta: string;
  url: any;
  minHeight: string = "600px";
  mostrarExternalLink: boolean = false;

  idGestor: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer,) {
    this.codigoGA = data.codigoGA;
    this.title = data.title;
  }

  ngOnInit() {

    // this.idGestor = this.ruta.substr(this.ruta.lastIndexOf("=") + 1);

    // if (this.idGestor.length == 24) this.mostrarExternalLink = true;

    let heigth = window.innerHeight;

    if (heigth > 600) this.minHeight = `${heigth}px`;
    this.ruta = this.baseUrl + this.codigoGA;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.ruta);
  }

}
