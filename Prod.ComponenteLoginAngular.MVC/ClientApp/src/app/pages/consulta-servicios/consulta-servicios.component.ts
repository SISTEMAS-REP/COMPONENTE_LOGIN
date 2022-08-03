import { Component, OnInit } from '@angular/core';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-servicios',
  templateUrl: './consulta-servicios.component.html',
})

export class ConsultaServiciosComponent implements OnInit {

  enumerado: enumerados = new enumerados();
  listaOpciones: Array<any>;

  constructor(private portalEnlaceService: PortalEnlaceService,
              private sanitizer: DomSanitizer,
              private _activatedRoute: ActivatedRoute) {

                this.listaOpciones = [];
              }

  ngOnInit(): void {

    const servicio = this._activatedRoute.snapshot.params.servicio || "Consultatutramite";
    this.fnListarSeccion(servicio);
  }

  fnListarSeccion = (value: string) => {
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_SERVICIOS
    })
      .then(resp => {
        this.listaOpciones = resp.data.map((item) => {
          return { ...item, activo: item.enlaceSeccion == value };
        });
      })
      .catch(err => []);
  }

  onChangeSeccion = (value: string) => {
    this.listaOpciones = this.listaOpciones.map((item) => {
      return { ...item, activo: item.enlaceSeccion == value };
    });
  };

  fnSafeUrl = (url)=>{
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fnNavigate = (url)=>{
    window.open(url);
  }

}
