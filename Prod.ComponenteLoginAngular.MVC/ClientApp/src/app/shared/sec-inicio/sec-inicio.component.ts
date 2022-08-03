import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sec-inicio',
  templateUrl: './sec-inicio.component.html',
  // styleUrls: ['./sec-inicio.component.css']
})
export class SecInicioComponent implements OnInit {
  swFormulario = 'datosUsuario';
  nombreFormulario = 'Mis Datos';
  constructor() { }

  ngOnInit(): void {

  }

  fnBtnLink = (opc) => {
    this.swFormulario = opc;
    switch (opc) {
      case 'datosUsuario':
        this.nombreFormulario = 'Mis Datos';
        break;
      case 'tramitesUsuario':
        this.nombreFormulario = 'Mis Trámites';
        break;
      case 'notificacionesUsuario':
        this.nombreFormulario = 'Mis Notificaciones';
        break;
      case 'misAplicaciones':
        this.nombreFormulario = 'Mis Aplicaciones';
        break;
    }
  }
}
