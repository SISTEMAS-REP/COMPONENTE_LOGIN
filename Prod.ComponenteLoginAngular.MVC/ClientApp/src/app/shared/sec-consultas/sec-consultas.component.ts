import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';
import { ComunService } from 'src/app/services/comun.service';

@Component({
  selector: 'app-sec-consultas',
  templateUrl: './sec-consultas.component.html',
  // styleUrls: ['./sec-consultas.component.css']
})
export class SecConsultasComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaOpcionesAC: Array<any>;
  listaOpcionesSE: Array<any>;

  fecha: any;
  constructor(
    private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer,
    private comunService: ComunService) { }

  ngOnInit(): void {
    this.fnListarSeccion();

  }

  fnListarSeccion = () => {
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_ATENCION_AL_CIUDADANO,
      EsPrincipal: true
    })
      .then(resp => {
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i].numeral = '#';
          resp.data[i].nombrelimpio = resp.data[i].nombre.replace(/\s/g, "");
        }
        this.listaOpcionesAC = resp.data;
      })
      .catch(err => []);
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_SERVICIOS,
      EsPrincipal: true
    })
      .then(resp => {
        this.listaOpcionesSE = resp.data;
      })
      .catch(err => []);
  }

  sumarClick = (item) =>{
    let dato = {
      IdPortalEnlace : item.idPortalEnlace
    }
    this.comunService.SumarClickConsultasLinea(dato)
      .then(resp => {
       
      })
      .catch(err => []);
  }

  fnSafeUrl = (url) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
