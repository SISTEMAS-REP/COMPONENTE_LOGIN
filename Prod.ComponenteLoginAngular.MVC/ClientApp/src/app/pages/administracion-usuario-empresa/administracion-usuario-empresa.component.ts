import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion-usuario-empresa',
  templateUrl: './administracion-usuario-empresa.component.html',
  styleUrls: ['./administracion-usuario-empresa.component.css']
})
export class AdministracionUsuarioEmpresaComponent implements OnInit {
  isVisiblePrincipal : boolean = true;
  isVisibleEditarUsuario : boolean = false;
  isVisibleAgregarUsuario : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  BtnAgregarUsuario= () =>{ 
    this.isVisibleAgregarUsuario = true;
    this.isVisiblePrincipal = false;  
    this.isVisibleEditarUsuario = false; 
  }


  BtnEditarUsuario= () =>{ 
    this.isVisibleEditarUsuario = true; 
    this.isVisibleAgregarUsuario = false;
    this.isVisiblePrincipal = false;  
  }

  BtnCancelarContacto= () =>{ 
    this.isVisiblePrincipal = true; 
    this.isVisibleEditarUsuario = false;
    this.isVisibleAgregarUsuario = false;  
  }


}
