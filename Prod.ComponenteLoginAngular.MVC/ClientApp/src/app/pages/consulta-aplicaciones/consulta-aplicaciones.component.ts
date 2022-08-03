import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';
import { ComunService } from '../../services/comun.service';

@Component({
  selector: 'app-consulta-aplicaciones',
  templateUrl: './consulta-aplicaciones.component.html'
})
export class ConsultaAplicacionesComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaAplicaciones: Array<any>;
  persona: any;
  isAuth = false;

  constructor(
    private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer,
    private comunService: ComunService
    ) { 
      if (localStorage.getItem('AppVusp')) {
        this.isAuth = true;
      }
    }

  ngOnInit(): void {
    this.comunService.obtenerDatosUsuario()
    .then(resp => {
      this.persona = resp.data;
      if(resp.data.nroDocPerNatural.length == 11)
      {
        this.persona.nroDocPerNatural = resp.data.nroDocPerNatural.substring(2,10)
      }
      this.fnCargarAplicaciones(this.persona);
    })
  }

  fnCargarAplicaciones = (persona) =>{
    this.comunService.ObtenerSistemas({
       IdTipoPersona: persona.idTipoPersona,
       NroDocumento: persona.nroDocumento,
       NroDocPerNatural: persona.nroDocPerNatural
    })
    .then(resp => {
      this.listaAplicaciones = resp.data;
    })
    .catch(err => []);
  }


  fnSafeUrl = (url) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
