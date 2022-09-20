import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../services/comun.service';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-aplicaciones-usuario',
  templateUrl: './aplicaciones-usuario.component.html',
  styleUrls: ['./aplicaciones-usuario.component.css']
})
export class AplicacionesUsuarioComponent implements OnInit {
  persona: any;
  listaAplicaciones: Array<any>;
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;
  constructor(
    private comunService: ComunService,
    private sanitizer: DomSanitizer,
  ) { }

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
    this.comunService.p_Obtener_Datos_Aplicacion_By_Usuario({
       IdTipoPersona: persona.idTipoPersona,
       NroDocumento: persona.nroDocumento,
       NroDocPerNatural: persona.nroDocPerNatural
    })
    .then(resp => {
      this.listaAplicaciones = resp;
      if(resp.length != 0){
        for (var i = 0; i < resp.length; i++) {
          var binary = atob(resp[i].conten_img.replace(/\s/g, ''));
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);
          for (var e = 0; e < len; e++) {
            view[e] = binary.charCodeAt(e);
          }
          var blob = new Blob([view], { type: this.contentType });
          var urlArchivo = URL.createObjectURL(blob);
          this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
          this.listaAplicaciones[i].urlArchivo = this.urlArchivo;
        }
      }
    })
    .catch(err => []);
  }

}
