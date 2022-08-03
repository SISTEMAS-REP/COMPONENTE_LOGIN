import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { ComunService } from 'src/app/services/comun.service';
import { LoginService } from 'src/app/services/login.service';
import { enumerados } from 'src/app/enums/enumerados';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  // styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  form = new usuarioModel();
  tipoIdentificacion = 0;
  enumerado: enumerados = new enumerados();
  
  constructor(
    private comunService: ComunService,
    private loginService: LoginService
    ) { }

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
    this.form.NombreCompleto = data.nombres + " " + data.apellidos;
    this.form.RazonSocial = data.razonSocial;
    this.form.CorreoElectronico = data.email;
    this.form.Celular = data.celular;
    this.form.Telefono = data.telefono;
    this.form.Direccion = data.direccion;
    this.form.NumeroDocumento = data.nroDocumento;
    this.tipoIdentificacion = data.idTipoIdentificacion;
  };

}
