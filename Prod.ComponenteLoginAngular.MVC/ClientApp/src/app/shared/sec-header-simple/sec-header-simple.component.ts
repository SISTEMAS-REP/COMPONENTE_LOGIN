import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { ComunService } from 'src/app/services/comun.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { enumerados } from 'src/app/enums/enumerados';

@Component({
  selector: 'app-sec-header-simple',
  templateUrl: './sec-header-simple.component.html',
  styleUrls: ['./sec-header-simple.component.css']
})
export class SecHeaderSimpleComponent implements OnInit {
  form = new usuarioModel();
  urlWebPV = environment.apiWebPV;
  tipoPersona = 0;
  isAuth = false;
  enumerado: enumerados = new enumerados();
  isRepresentanteLegal: boolean = false;
  
  constructor(private comunService: ComunService,
    private loginService: LoginService) { 
      if (localStorage.getItem('AppVusp')) {
        this.isAuth = true;
      }
    }

  ngOnInit(): void {
    this.comunService.obtenerDatosUsuario()
      .then(resp => {
        this.fnCargarUsuario(resp.data);
      })
      .catch(err => []);
  }

  fnCargarUsuario = (data: any) => {
    this.form.Nombres = data.nombres;
    this.form.Apellidos = data.apellidos;
    this.form.NombreCompleto = data.nombreCompleto;
    this.form.RazonSocial = data.razonSocial;
    this.form.CorreoElectronico = data.email;
    this.form.Celular = data.celular;
    this.form.Telefono = data.telefono;
    this.tipoPersona = data.idTipoIdentificacion;
    this.isRepresentanteLegal = data.isRepresentanteLegal;
  };

  fnCerrarSesion = () => {
    location.href = this.urlWebPV + "/ExtranetToken/ExternalLogOut";
  }

}
