import { AfterViewInit, Component,  ElementRef, OnInit, QueryList,  ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';

@Component({
  selector: 'app-consulta-atencion-ciudadano',
  templateUrl: './consulta-atencion-ciudadano.component.html',
  // styleUrls: ['./consulta-atencion-ciudadano.component.css']
})
export class ConsultaAtencionCiudadanoComponent
  implements OnInit
{

  enumerado: enumerados = new enumerados();
  listaOpciones: Array<any>;
  constructor(
    private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const consulta = this._activatedRoute.snapshot.params.consulta || "Consultas";
    this.fnListarSeccion(consulta);
  }

  fnListarSeccion = async (value: string) => {
    await this.portalEnlaceService
      .portalEnlaceListarPorSeccion({
        TipoSeccion:
          this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_ATENCION_AL_CIUDADANO,
      })
      .then((resp) => {
        this.listaOpciones = resp.data.map((item) => {
          return { ...item, activo: item.enlaceSeccion == value };
        });
      })
      .catch((err) => []);
  };

  onChangeSeccion = (value: string) => {
    this.listaOpciones = this.listaOpciones.map((item) => {
      return { ...item, activo: item.enlaceSeccion == value };
    });
  };

  fnNavigate = (url) => {
    window.open(url);
  };

  fnSafeUrl = (url) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  };
}
