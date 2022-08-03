import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';

@Component({
  selector: 'app-apps-moviles',
  templateUrl: './apps-moviles.component.html',
  // styleUrls: ['./apps-moviles.component.css']
})
export class AppsMovilesComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaOpcionesIND: Array<any>;
  listaOpcionesPES: Array<any>;
  listaOpcionesOTROS: Array<any>;
  constructor(private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fnListarSeccion();
  }

  fnListarSeccion = () => {
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.APLICACIONES_MOVILES_INDUSTRIA
    })
      .then(resp => {
        this.listaOpcionesIND = resp.data;
      })
      .catch(err => []);

    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.APLICACIONES_MOVILES_PESCA
    })
      .then(resp => {
        this.listaOpcionesPES = resp.data;
      })
      .catch(err => []);

    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.APLICACIONES_MOVILES_OTROS
    })
      .then(resp => {
        this.listaOpcionesOTROS = resp.data;
      })
      .catch(err => []);
  }

  fnSafeUrl = (url) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
