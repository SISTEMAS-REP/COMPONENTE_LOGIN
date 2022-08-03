import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { enumerados } from 'src/app/enums/enumerados';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { ModalIniciarSesionTramiteComponent } from 'src/app/shared/modal/iniciar-sesion-tramite/iniciar-sesion-tramite.component';

@Component({
  selector: 'app-sec-servicios',
  templateUrl: './sec-servicios.component.html',
  // styleUrls: ['./sec-servicios.component.css']
})
export class SecServiciosComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  listaOpcionesSE: Array<any>;
  constructor(private portalEnlaceService: PortalEnlaceService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fnListarSeccion();
  }

  fnListarSeccion = () => {
    this.portalEnlaceService.portalEnlaceListarPorSeccion({
      TipoSeccion: this.enumerado.ENUMERADO.SERVICIOS_EMPRESARIALES,
      EsPrincipal: true
    })
      .then(resp => {
        this.listaOpcionesSE = resp.data;

      })
      .catch(err => []);
  }

  fnSafeUrl = (url) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fnRecortarTexto = (texto) => {
    let longitud = 100;
    return texto.length > longitud ? texto.substr(0, (longitud - 3)) + '...' : texto;
  }
  EnviarTramite = ()=> {
    if (localStorage.getItem('redirect')) {
      localStorage.removeItem('redirect');
    }
    
    var urlTupa = "/tramite-linea?CodDependencia="+328;
    localStorage.setItem('redirect', JSON.stringify(urlTupa));

    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: {},
      disableClose: true,
    }
    const dialogRef = this.dialog.open(ModalIniciarSesionTramiteComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (JSON.parse(result)) {
        console.log("Cerrado")
      }
    });
  }
}
