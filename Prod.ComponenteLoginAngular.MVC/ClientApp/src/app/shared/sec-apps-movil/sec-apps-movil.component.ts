import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';

@Component({
  selector: 'app-sec-apps-movil',
  templateUrl: './sec-apps-movil.component.html',
  // styleUrls: ['./sec-apps-movil.component.css']
})
export class SecAppsMovilComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaOpciones: Array<any>;
  contenido = "";
  constructor(private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.fnListarSeccion();
  }

  fnListarSeccion = () => {
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.APLICACIONES_MOVILES_PESCA,
      EsPrincipal: true
    })
      .then(resp => {
        this.listaOpciones = resp.data;
        // this.fnMostrarOpciones();
      })
      .catch(err => []);
  }

  fnMostrarOpciones = () => {
    let total = this.listaOpciones.length;
    let cantFilas = Math.floor(total / 3);
    let resto = total % 3;
    let c = [];
    for (let i = 0; i < total; i++) {
      if (i < total - resto) {
        c.push('<div class="col-sm-4 col-md-4">');
        c.push('<div class="form-group">');
        c.push('<a data-link="/apps-moviles" class="ruta">');
        // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
        // c.push('<a [routerLink]="[\'/apps-moviles\']">');
        c.push('<div class="card">');
        c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i].imagen + '"/>');
        c.push('<div class="caption">');
        c.push('<h1 align="center">' + this.listaOpciones[i].nombre + '</h1>');
        c.push('<p>' + this.listaOpciones[i].descripcion + '</p>');
        c.push('</div>');
        c.push('</div>');
        c.push('</a>');
        c.push('</div>');
        c.push('</div>');
        c.push('<div class="col-sm-4 col-md-4">');
        c.push('<div class="form-group">');
        c.push('<a data-link="/apps-moviles" class="ruta">');
        // c.push('<a [routerLink]="[\'/apps-moviles\']">');
        // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
        c.push('<div class="card">');
        c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i + 1].imagen + '"/>');
        c.push('<div class="caption">');
        c.push('<h1 align="center">' + this.listaOpciones[i + 1].nombre + '</h1>');
        c.push('<p>' + this.listaOpciones[i + 1].descripcion + '</p>');
        c.push('</div>');
        c.push('</div>');
        c.push('</a>');
        c.push('</div>');
        c.push('</div>');
        c.push('<div class="col-sm-4 col-md-4">');
        c.push('<div class="form-group">');
        c.push('<a data-link="/apps-moviles" class="ruta">');
        // c.push('<a [routerLink]="[\'/apps-moviles\']">');
        // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
        c.push('<div class="card">');
        c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i + 2].imagen + '"/>');
        c.push('<div class="caption">');
        c.push('<h1 align="center">' + this.listaOpciones[i + 2].nombre + '</h1>');
        c.push('<p>' + this.listaOpciones[i + 2].descripcion + '</p>');
        c.push('</div>');
        c.push('</div>');
        c.push('</a>');
        c.push('</div>');
        c.push('</div>');
        i = i + 2;
      }
      else {
        if (resto == 2) {
          c.push('<div class="col-sm-4 col-md-4 col-offset-2">');
          c.push('<div class="form-group">');
          c.push('<a data-link="/apps-moviles" class="ruta">');
          // c.push('<a [routerLink]="[\'/apps-moviles\']">');
          // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
          c.push('<div class="card">');
          c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i].imagen + '"/>');
          c.push('<div class="caption">');
          c.push('<h1 align="center">' + this.listaOpciones[i].nombre + '</h1>');
          c.push('<p>' + this.listaOpciones[i].descripcion + '</p>');
          c.push('</div>');
          c.push('</div>');
          c.push('</a>');
          c.push('</div>');
          c.push('</div>');
          c.push('<div class="col-sm-4 col-md-4">');
          c.push('<div class="form-group">');
          c.push('<a data-link="/apps-moviles" class="ruta">');
          // c.push('<a [routerLink]="[\'/apps-moviles\']">');
          // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
          c.push('<div class="card">');
          c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i + 1].imagen + '"/>');
          c.push('<div class="caption">');
          c.push('<h1 align="center">' + this.listaOpciones[i + 1].nombre + '</h1>');
          c.push('<p>' + this.listaOpciones[i + 1].descripcion + '</p>');
          c.push('</div>');
          c.push('</div>');
          c.push('</a>');
          c.push('</div>');
          c.push('</div>');
        }
        else {
          c.push('<div class="col-sm-4 col-md-4 col-offset-4">');
          c.push('<div class="form-group">');
          // c.push('<a [routerLink]="[\'/apps-moviles\']">');
          c.push('<a data-link="/apps-moviles" class="ruta">');
          // c.push('<a ng-reflect-router-link="/apps-moviles" href="/apps-moviles">');
          c.push('<div class="card">');
          c.push('<img class="img-responsive" src="assets/' + this.listaOpciones[i].imagen + '"/>');
          c.push('<div class="caption">');
          c.push('<h1 align="center">' + this.listaOpciones[i].nombre + '</h1>');
          c.push('<p>' + this.listaOpciones[i].descripcion + '</p>');
          c.push('</div>');
          c.push('</div>');
          c.push('</a>');
          c.push('</div>');
          c.push('</div>');
        }
      }
    }
    this.contenido = c.join("");
  }

  fnSafeHTMLUrl = (contenido) => {
    return this.sanitizer.bypassSecurityTrustHtml(contenido);
  }
}
