import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';


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

  token: string = "";
  constructor(
    private componenteLoginService: ComponenteLoginService,
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.token = params['var'] || null; //"W3Y9more8V78gBM5OXAoZVW0eieVjlgwIslash1zxVmAlDVKSIequal";
    });
    this.fnCargarAplicaciones();
  }

  ClickRegresar = () =>{
    this.componenteLoginService.ObtenerUrlsVolver({
      TipoBtn : 2
    })
      .then(resp => {
      window.location.href  = resp.data;      
      })

      .catch(err => []);
   }
   
  fnCargarAplicaciones = () =>{
    let data = {
       url: this.token
    }
    this.componenteLoginService.ListAplicacionesByUsuario(data)
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
